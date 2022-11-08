import { FormControl , Select, MenuItem, InputLabel } from "@mui/material";


export default function LessRegExtraForm({ingredient, changeIngredientAmount}){
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
                <MenuItem value={1}> Less </MenuItem>
                <MenuItem value={2}> Regular </MenuItem>
                <MenuItem value={3}> Extra </MenuItem>
            </Select>
         </FormControl>
    )
}