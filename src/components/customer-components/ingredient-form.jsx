import { Typography, Box, Button } from "@mui/material"
import { Stack } from "@mui/system"
import { useState } from "react"
import MilkForm from "./milk-form"
import NonMilkForm from "./non-milk-form"

export default function IngredientForm({ingredients, changeMilk, changeIngredientAmount, removeIngredient}){
    
    const [ingredientObj, setIngredientList] = useState(ingredients)
    return(
        
        <Box>
        {
            (ingredientObj.length != 0)  ? (
                Object.keys(ingredientObj).map((ingKey, index) => {
                if (ingredientObj[ingKey].isMilk) {
                    return(
                        <Stack direction="row" key={index}>
                            <Typography>Milk</Typography>
                            <MilkForm ingredient={ingredientObj[ingKey]} changeMilk={changeMilk}></MilkForm>
                        </Stack>
                    )  
                } else {
                    return(
                        <Stack direction="row" key={index}>
                            <Typography>{ingredientObj[ingKey]['name']}</Typography>
                            <NonMilkForm ingredient={ingredientObj[ingKey]} changeIngredientAmount={changeIngredientAmount}></NonMilkForm>
                            <Button onClick={() => {removeIngredient(ingredientObj[ingKey])}}>X</Button>
                        </Stack>
                    )
                }
            })
            ) : <Typography>EMPTY DRINK</Typography> 
        }
        </Box>
    )
    
}