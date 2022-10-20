import { FormControl , Select, MenuItem, InputLabel } from "@mui/material";

export default function NonMilkForm({ingredient, changeAmount}){
    return(
        <FormControl fullWidth>
            <InputLabel id="size-label">{ingredient.name}</InputLabel>
            <Select
                labelId="size-label"
                id="size-select"
                value={ingredient.options}
                label="Size"
                name={ingredient.name}
                onChange={changeAmount}
            >
                <MenuItem value={1}> 1 unit </MenuItem>
                <MenuItem value={2}> 2 unit </MenuItem>
                <MenuItem value={3}> 3 unit </MenuItem>
            </Select>
         </FormControl>
    )
}