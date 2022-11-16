import { FormControl , Select, MenuItem, InputLabel } from "@mui/material";


export default function YesNoForm({ingredient, yesNoRemoval}){
    return(
        <FormControl fullWidth>
            <InputLabel id="label">{ingredient.name}</InputLabel>
            <Select
                labelId="label"
                id="select"
                value={ingredient.options}
                label="select"
                name={ingredient.name}
                onChange={yesNoRemoval}
            >
                <MenuItem value={0}> No </MenuItem>
                <MenuItem value={1}> Yes </MenuItem>
            </Select>
         </FormControl>
    )
}