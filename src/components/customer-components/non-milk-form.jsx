import { FormControl , Select, MenuItem, InputLabel } from "@mui/material";

export default function NonMilkForm({ingredient, changeIngredientAmount}){
    return(
        <FormControl fullWidth>
            <InputLabel id="label">{ingredient.name}</InputLabel>
            <Select
                labelId="label"
                id="select"
                value={ingredient.options}
                label="select"
                name={ingredient.name}
                onChange={changeIngredientAmount}
            >
                <MenuItem value={1}> 1 unit </MenuItem>
                <MenuItem value={2}> 2 unit </MenuItem>
                <MenuItem value={3}> 3 unit </MenuItem>
            </Select>
         </FormControl>
    )
}