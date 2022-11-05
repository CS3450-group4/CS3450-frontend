import { Typography, Box, Button } from "@mui/material"
import { Stack } from "@mui/system"
import MilkForm from "./milk-form"
import NonMilkForm from "./non-milk-form"

export default function IngredientForm({ingredients, changeMilk, changeIngredientAmount, removeIngredient}){
    return(
        <Box>
        {
            (ingredients.length != 0)  ? (
                // TODO: PUT MILKS ON TOP, THEN THE REST try .filter() method
                ingredients.map((ingredient, index) => {
                    if(ingredient.options == 0) {
                        var event = {}
                        event["target"] = { value: 1, name: ingredient.name }
                        changeIngredientAmount(event)
                    }
                    if (ingredient.isMilk) {
                        return(
                            <Stack direction="row" key={index}>
                                <Typography>Milk</Typography>
                                <MilkForm ingredient={ingredient} changeMilk={changeMilk}></MilkForm>
                            </Stack>
                        )  
                    } else {
                        return(
                            <Stack direction="row" key={index}>
                                <Typography>{ingredient['name']}</Typography>
                                <NonMilkForm ingredient={ingredient} changeIngredientAmount={changeIngredientAmount}></NonMilkForm>
                                <Button onClick={() => {removeIngredient(ingredient)}}>X</Button>
                            </Stack>
                        )
                    }
                })
            ) : <Typography>EMPTY DRINK</Typography> 
        }
        </Box>
    )
    
}