import { Button, Typography, Box} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AddOnForm from "./add-on-form"
import IngredientForm from "./ingredient-form"
import SizeForm from "./size-form"

export default function OrderBox({frapOrder, setCart, customerCart}){
    const [milkList, setMilkList] = useState([])
    const [price, setPrice] = useState(+frapOrder.price)
    const startPrice = +frapOrder.price
    const [size, setSize] = useState(+frapOrder.size)
    const [ingredients, setIngredients] = useState(frapOrder.ingredientList)
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
        let oldPrice = price;
        setPrice(price - (size * 100) + (event.target.value * 100))
        // setPrice(newPrice)
        // var changedSizeList = []
        // frapOrder.ingredientList.forEach(ingredient => {
        //     var updatedIng = {
        //         name: ingredient.name,
        //         stock: ingredient.stock,
        //         retailCost: ingredient.retailCost,
        //         wholeSaleCost: ingredient.wholeSaleCost,
        //         isMilk: ingredient.isMilk,
        //         options: ingredient.options * event.target.value
        //     }
        //     newPrice += (updatedIng.retailCost * updatedIng.options)
        //     changedSizeList.push(updatedIng)
        // })
        // setPrice(newPrice)
        // updateIngredients(changedSizeList)
    }
    
    function rerender() {
        forceUpdate(!update)
    }

    function updateIngredients(updatedIngredients) {
        var newIngVal = 0
        // var oldIngVal = 0
        // frapOrder.ingredientList.forEach(ingredient => {
        //     oldIngVal += (ingredient.retailCost * ingredient.options)
        // })
        updatedIngredients.forEach(ingredient => {
            newIngVal += (ingredient.retailCost * ingredient.options)
        });
        let newPrice = +price - newIngVal;
        setPrice(startPrice - (newPrice))
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
        newMilk.options = 1
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
            name: frapOrder.name,
            price: price,
            ingredients: ingredients,
            size: size
        }
        var inStock = true;
        newDrink.ingredients.forEach(ingredient => {
            if(ingredient.options > ingredient.stock) {
                inStock = false
            }
        })
        if(inStock) {
            var cart = customerCart
            cart.push(newDrink)
            setCart(cart)
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