import { Typography, Box, Button } from "@mui/material"
import { Stack } from "@mui/system"
import MilkForm from "./milk-form"
import LessRegExtraForm from "./less-reg-extra-form"
import "./customer.css"

export default function IngredientForm({ingredients, changeMilk, changeIngredientAmount, removeIngredient}){

    const milkMap = ingredients.map((ingredient, index) => {
        if(ingredient.options == 0) {
            var event = {}
            event["target"] = { value: 1, name: ingredient.name }
            changeIngredientAmount(event)
        }
        if (ingredient.isMilk) {
            return(
                <MilkForm ingredient={ingredient} changeMilk={changeMilk}></MilkForm>
            )  
        }
    });
    
    const addonMap = ingredients.map((ingredient, index) => {
        if(ingredient.options == 0) {
            var event = {}
            event["target"] = { value: 1, name: ingredient.name }
            changeIngredientAmount(event)
        }
        if(!ingredient.isMilk) {
            return(
                <Stack direction="row" key={index}>
                    <LessRegExtraForm ingredient={ingredient} changeIngredientAmount={changeIngredientAmount}></LessRegExtraForm>
                    <Button onClick={() => {removeIngredient(ingredient)}}>X</Button>
                </Stack>
            )
        }
    })
    
    function IngredientForms() {
        return (
            <Stack spacing={2}>
                {milkMap}
                {addonMap}
            </Stack>
        )
    }

    return(
        <Box className="IngredientForm">
        {
            (ingredients.length != 0)  ? (
                <IngredientForms></IngredientForms>
            ) : <Typography>EMPTY DRINK</Typography> 
        }
        </Box>
    )
    
}