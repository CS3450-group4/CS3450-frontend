import { Button, Typography, Box} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AddOnForm from "./add-on-form"
import IngredientForm from "./ingredient-form"
import MilkForm from "./milk-form"
import NonMilkForm from "./non-milk-form"
import SizeForm from "./size-form"

export default function OrderBox({frapOrder, setCart, customerCart}){
    const [milkList, setMilkList] = useState([])
    const [price, setPrice] = useState(frapOrder.price)
    const [size, setSize] = useState(frapOrder.size)
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
        // var newPrice = 0;
        // ingredients.forEach(ingredient => {
        //     newPrice += ((ingredient.options * event.target.value) * ingredient.retailCost)
        // })
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
        var tempPrice = 0
        updatedIngredients.forEach(ingredient => {
            tempPrice += (ingredient.retailCost * ingredient.options)
        });
        setPrice(tempPrice)
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
        var cart = customerCart
        cart.push(newDrink)
        setCart(cart)
    }

    const ingredientForm = (ingredients.length !== 0)  ? (
        ingredients.map((ingredient, index) => {
        if (ingredient.isMilk) {
            return (
                <Stack direction="row" key={index}>
                    <Typography>Milk</Typography>
                    <MilkForm ingredient={ingredient} changeMilk={changeMilk}></MilkForm>
                </Stack>
            )
        } else {
            return (
                <Stack direction="row" key={index}>
                    <Typography>{ingredient['name']}</Typography>
                    <NonMilkForm ingredient={ingredient} changeIngredientAmount={changeIngredientAmount}></NonMilkForm>
                    <Button onClick={() => {removeIngredient(ingredient)}}>X</Button>
                </Stack>
            )
        }
    })
    ) : <Typography>EMPTY DRINK</Typography> 

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