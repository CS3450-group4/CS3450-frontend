import { Typography, Box } from "@mui/material"
import { Stack } from "@mui/system"
import MilkForm from "./milk-form"
import NonMilkForm from "./non-milk-form"

export default function IngredientForm({ingredients, changeMilk, changeIngredientAmount}){
    return(
        <Box>
            {/* <MilkForm ingredient={ingredients.find(element => element.isMilk == true)} changeMilk={changeMilk}></MilkForm> */}
        {
            (ingredients.length != 0)  ? (
                ingredients.map((ingredient, index) => {
                if (ingredient.isMilk) {
                        <Stack direction="row" key={index}>
                            <Typography>Milk</Typography>
                            <MilkForm ingredient={ingredient} changeMilk={changeMilk}></MilkForm>
                        </Stack>
                } else {
                        <Stack direction="row" key={index}>
                            <Typography>{ingredient['name']}</Typography>
                            <NonMilkForm ingredient={ingredient} changeIngredientAmount={changeIngredientAmount}></NonMilkForm>
                        </Stack>
                }
            })
            ) : <Typography>EMPTY DRINK</Typography> 
        }
        </Box>
    )
    
}