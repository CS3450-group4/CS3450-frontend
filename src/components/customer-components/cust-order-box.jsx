import { Button, Typography, Box} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import AddOnForm from "./add-on-form"
import MilkForm from "./milk-form"
import NonMilkForm from "./non-milk-form"
import SizeForm from "./size-form"

export default function OrderBox({stateChanger, state, frapOrder, setCart, customerCart}){

    const [milkList, setMilkList] = useState([])
    const [nonMilkList, setNonMilkList] = useState([])
    const [price, setPrice] = useState(frapOrder.price)
    const [size, setSize] = useState(frapOrder.size)
    const [ingredients, setIngredients] = useState(frapOrder.ingredientList)
    const [update, forceUpdate] = useState(true)

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`)
        .then((res) => res.json())
        .then(
          (data) => {
            var milks = []
            var nonMilkIngredients = []
            data.forEach(ingredient => {
                if(ingredient.isMilk) {
                    milks.push(ingredient) 
                } else {
                    nonMilkIngredients.push(ingredient)
                }
            });
            setMilkList(milks)
            setNonMilkList(nonMilkIngredients)
          }
        )
    }

    const changeSize = (event) => {
        setPrice(price - (size * 100) + (event.target.value * 100))
        setSize(event.target.value)
        // ingredients.forEach(ingredient => {
        //     newPrice += (ing)
        // })
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
        // TODO: MAKE SURE THIS WORKS AND IS UPDATING ON CHANGE
        
        // const updatedIng = {
        //     name: ing.name,
        //     stock: ing.stock,
        //     retailCost: ing.retailCost,
        //     wholeSaleCost: ing.wholeSaleCost,
        //     isMilk: ing.isMilk,
        //     options: value
        // }
        // var filtered = ingredients.filter(element => element.name !== name)
        // filtered.push(updatedIng)
        // updateIngredients(filtered)
        // updateIngredients(ingredients)
        
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
                {/* <MilkForm ingredient={ingredients.find(element => element.isMilk == true)} changeMilk={changeMilk}></MilkForm> */}
                {/* <IngredientForm ingredients={ingredients} changeMilk={changeMilk} changeIngredientAmount={changeIngredientAmount}></IngredientForm> */}
                {ingredientForm}
            </Stack>
                <AddOnForm ingredients={ingredients} addIngredient={addIngredient}></AddOnForm>
            
            <Button onClick={() => stateChanger("menu")} variant="contained"> Cancel Order </Button>
            <Button onClick={() => {
                sumbitDrink()
                stateChanger("menu")}} variant="contained"> Order Drink</Button>
        </Box> 
    )
}