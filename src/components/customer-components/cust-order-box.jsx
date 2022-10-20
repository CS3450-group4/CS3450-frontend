import { Button, Typography, Box} from "@mui/material"
import { Stack } from "@mui/system"
import { useState } from "react"
import MilkForm from "./milk-form"
import NonMilkForm from "./non-milk-form"
import SizeForm from "./size-form"

export default function OrderBox({stateChanger, state, frapOrder}){

    const [price, setPrice] = useState(frapOrder.price)
    const [size, setSize] = useState(frapOrder.size)
    const [ingredients, setAmount] = useState(frapOrder.ingredientList)

    const custFrappe = {
        name: frapOrder.name,
        price: price,
        size: size,
        ingredientList: ingredients
    }

    const changeSize = (event) => {
        setSize(event.target.value)
    }

    const changeAmount = (event) => {
    }
    
    function sumbitDrink() {
        // send drink to cashiers order queue
    }

    const ingredientForm = ingredients.map((ingredient, index) => {
        if (ingredient["isMilk"]) {
            return (
                <Stack direction="row" key={index}>
                    <Typography>{ingredient['name']}</Typography>
                    <MilkForm></MilkForm>
                </Stack>
            )
        } else {
            return (
                <Stack direction="row" key={index}>
                    <Typography>{ingredient['name']}</Typography>
                    <NonMilkForm ingredient={ingredient} changeAmount={changeAmount}></NonMilkForm>
                </Stack>
            )
        }
    });

    return(
        <Box width="75%">
            <Typography> ORDER SCREEN</Typography>
            <Typography>{frapOrder.name}</Typography>
            <Typography>{custFrappe.price}</Typography>
            <Stack 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <SizeForm size={size} changeSize={changeSize}></SizeForm>
            </Stack>
            <Stack>
                {ingredientForm}
            </Stack>
            
            
            <Button onClick={() => stateChanger(!state)}> Cancel Order </Button>
        </Box> 
    )
}