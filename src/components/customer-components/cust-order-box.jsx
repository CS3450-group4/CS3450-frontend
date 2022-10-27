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
    const [milkList, setMilkList] = useState(null)
    const [price, setPrice] = useState(frapOrder.price)
    const [size, setSize] = useState(frapOrder.size)
    const [ingredients, setIngredients] = useState(frapOrder.ingredientList)
    const [update, forceUpdate] = useState(true)

    let navigation = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])

    // useEffect(() => {
    //     console.log(ingredients)
    // }, [ingredients])

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

    function updateIngredients(updatedIngs) {
        var tempPrice = 0
        Object.keys(updatedIngs).forEach(key => {
            tempPrice += (updatedIngs[key].retailCost * updatedIngs[key].options)
        });
        setPrice(tempPrice)
        setIngredients(updatedIngs)
        rerender()
    }
    
    function removeIngredient(unwantedIng) {
        var ingredientsCopy = ingredients
        delete ingredientsCopy[`${unwantedIng.name}`]
        updateIngredients(ingredientsCopy)
    }

    function addIngredient(newIngredient) {
        var ingredientsCopy = ingredients
        ingredientsCopy[newIngredient.name] = newIngredient
        updateIngredients(ingredientsCopy)
    }

    const changeMilk = (event) => {
        const {value, name} = event.target
        var ingsCopy = {}
        const newMilk = milkList.find(element => element.name === value)
        for(let key in ingredients) {
            if (ingredients[key].name == name) {
                ingsCopy[newMilk.name] = newMilk
            } else {
                ingsCopy[key] = ingredients[key]
            }
        }
        console.log(ingsCopy)
        updateIngredients(ingsCopy)
    }

    const changeIngredientAmount = (event) => {
        const {value, name} = event.target
        var ingsCopy = ingredients
        ingsCopy[name].options = value
        updateIngredients(ingsCopy)
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