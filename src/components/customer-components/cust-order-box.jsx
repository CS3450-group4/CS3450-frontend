import { Button, Typography, Box} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AddOnForm from "./add-on-form"
import IngredientForm from "./ingredient-form"
import SizeForm from "./size-form"

export default function OrderBox(){
    const drinkObj = JSON.parse(window.localStorage.getItem('selectedDrink'))
    var oldIngVal = 0
    drinkObj.ingredientList.forEach(ingredient => {
        oldIngVal += (ingredient.retailCost * ingredient.options * drinkObj.size)
    })
    const drinkMarkup = drinkObj.price - oldIngVal
    const [milkList, setMilkList] = useState([])
    const [price, setPrice] = useState(+drinkObj.price)
    const [size, setSize] = useState(drinkObj.size)
    const [allIngs, setAllIngs] = useState([])
    const [ingredients, setIngredients] = useState(drinkObj.ingredientList)
    const [update, forceUpdate] = useState(true)
    let navigation = useNavigate()

    useEffect(() => {
        fetchData();
    }, [update])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`)
        .then((res) => res.json())
        .then(
          (data) => {
            setAllIngs(data);
            var milks = []
            data.forEach(ingredient => {
                if(ingredient.isMilk) {
                    milks.push(ingredient) 
                }
            });
            setMilkList(milks)
          }
        )
    }

    function rerender() {
        forceUpdate(!update)
    }

    //--------------------- INGRDIENT MODIFING FUNCTIONS -----------------------//
    const changeSize = (event) => {
        setSize(event.target.value)
        var newIngVal = 0; 
        ingredients.forEach(ingredient => {
            newIngVal += (ingredient.retailCost * ingredient.options * event.target.value)
        });
        setPrice(drinkMarkup + newIngVal)
    }

    function updateIngredients(updatedIngredients) {
        var newIngVal = 0
        updatedIngredients.forEach(ingredient => {
            newIngVal += (ingredient.retailCost * ingredient.options * size)
        });
        setPrice(drinkMarkup + newIngVal)
        setIngredients(updatedIngredients)
        rerender()
    }

    function addIngredient(newIngredient) {
        var newIng = ingredients
        newIng.push(newIngredient)
        updateIngredients(newIng)
    }

    function removeIngredient(unwantedIng) {
        const newIngs = ingredients.filter(element => element.name !== unwantedIng.name)
        updateIngredients(newIngs)
    }

    const changeMilk = (event) => {
        const {value, name} = event.target
        const newMilk = milkList.find(element => element.name === value)
        newMilk.options = 2
        const index = ingredients.findIndex(element => element.name === name)
        var newIngs = ingredients
        newIngs[index] = newMilk
        updateIngredients(newIngs)
    }

    const changeIngredientAmount = (event) => {
        const {value, name} = event.target
        var index = ingredients.findIndex(element => element.name === name)
        ingredients[index].options = value
        updateIngredients(ingredients)
    }


    //--------------------- DATABASE MODIFING FUNCTIONS -----------------------//

    function getCustomerData() {
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              if (0 > data.userinfo.balance ) alert("Balance Too Low for Order!");
              else {
                if(checkStock(ingredients)) {
                    data.userinfo.balance = data.userinfo.balance - (+price)
                    updateCustomerBalance(data);
                    sumbitDrink()
                    navigation("../menu", {replace: true})
                }else {
                    alert("Sorry, we don't have enough ingredients in stock to complete your order :(")
                }
              }
          }
        )
    }
    function updateCustomerBalance(data) {
        try {
            fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(data),
              })
        } catch (error) {
            console.log(error);
        }
    }
    
    function sendToCashier(drink) {
        var orderDrinks = {}
        orderDrinks[drink.name] = drink.ingredients
        const customerOrder = {
            price: drink.price,
            user: window.localStorage.getItem('curUserID'),
            orderStatus: "unfullfilled",
            ingredientList: orderDrinks,
        }
        try {
            fetch(`http://localhost:8000/api/orders/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(customerOrder),
                })
        } catch (error) {
            console.log(error);
        }
        rerender()
    }

    function checkStock(ingredientList) {
        var inStock = true;
        var drinkIngNames = [];
        var drinkIngAmounts = [];
        ingredientList.forEach(ingredient => {
            drinkIngNames.push(ingredient.name)
            drinkIngAmounts.push(ingredient.options)
        })
        allIngs.forEach(ingredient => {
            var index = drinkIngNames.indexOf(ingredient.name)
            if (index != -1) {
                if((drinkIngAmounts[index] * size) > ingredient.stock) {
                    inStock = false;
                }
            }
        });
        return inStock;
    }

    function sumbitDrink() {
        var drink ={
            name: drinkObj.name,
            price: price,
            ingredients: ingredients,
            size: size
        }
        drink.ingredients.forEach(ingredient => {
            ingredient.options = (ingredient.options * drink.size)
        })
        sendToCashier(drink)
    }

    return(
        <Box width="75%">
            <Typography> ORDER SCREEN</Typography>
            <Typography>{drinkObj.name}</Typography>
            <Typography>${(price/100).toFixed(2)}</Typography>
            <Stack 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <SizeForm size={size} changeSize={changeSize}></SizeForm>
            </Stack>
            <Stack>
                <IngredientForm ingredients={ingredients} 
                changeIngredientAmount={changeIngredientAmount} 
                changeMilk={changeMilk}
                removeIngredient={removeIngredient}></IngredientForm>
            </Stack>
                <AddOnForm ingredients={ingredients} addIngredient={addIngredient}></AddOnForm>
            
            <Button onClick={() => navigation("../menu", {replace: true})} variant="contained"> Cancel Order </Button>
            <Button onClick={() => {
                getCustomerData()
                }} variant="contained"> Order Drink</Button>
        </Box> 
    )
}