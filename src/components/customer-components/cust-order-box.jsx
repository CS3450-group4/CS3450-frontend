import { Button, Typography, Box} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AddOnForm from "./add-on-form"
import IngredientForm from "./ingredient-form"
import SizeForm from "./size-form"

export default function OrderBox({frapOrder, setCart, customerCart}){
    const drinkObj = JSON.parse(window.localStorage.getItem('selectedDrink'))
    var oldIngVal = 0
    drinkObj.ingredientList.forEach(ingredient => {
        oldIngVal += (ingredient.retailCost * ingredient.options * drinkObj.size)
    })
    const drinkMarkup = drinkObj.price - oldIngVal
    const [milkList, setMilkList] = useState([])
    const [price, setPrice] = useState(+drinkObj.price)
    const [size, setSize] = useState(drinkObj.size)
    const [ingredients, setIngredients] = useState(drinkObj.ingredientList)
    const [update, forceUpdate] = useState(true)
    let navigation = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`)
        .then((res) => res.json())
        .then(
          (data) => {
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

    const changeSize = (event) => {
        setSize(event.target.value)
        var newIngVal = 0; 
        ingredients.forEach(ingredient => {
            newIngVal += (ingredient.retailCost * ingredient.options * event.target.value)
        });
        setPrice(drinkMarkup + newIngVal)
    }
    
    function rerender() {
        forceUpdate(!update)
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
    
    function removeIngredient(unwantedIng) {
        const newIngs = ingredients.filter(element => element.name !== unwantedIng.name)
        updateIngredients(newIngs)
    }

    function addIngredient(newIngredient) {
        var newIng = ingredients
        newIng.push(newIngredient)
        updateIngredients(newIng)
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
    
    function sumbitDrink() {
        var newDrink ={
            name: drinkObj.name,
            price: price,
            ingredients: ingredients,
            size: size
        }
        var inStock = true;
        newDrink.ingredients.forEach(ingredient => {
            if((ingredient.options * newDrink.size) > ingredient.stock) {
                inStock = false
            }
        })
        if(inStock) {
            newDrink.ingredients.forEach(ingredient => {
                ingredient.options = (ingredient.options * newDrink.size)
            })
            var cart;
            if(window.localStorage.getItem('customerCart') == null) {
                cart = [];
            } else {
                cart = JSON.parse(window.localStorage.getItem('customerCart'))
            }
            console.log(cart)
            cart.push(newDrink)
            window.localStorage.setItem('customerCart', JSON.stringify(cart))
        } else {
            alert("Sorry, we don't have enough ingredients in stock to complete your order :(")
        }

    }

    return(
        <Box width="75%">
            <Typography> ORDER SCREEN</Typography>
            <Typography>{frapOrder.name}</Typography>
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
                sumbitDrink()
                navigation("../menu", {replace: true})}} variant="contained"> Order Drink</Button>
        </Box> 
    )
}