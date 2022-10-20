import { FormControl , Select, MenuItem, InputLabel } from "@mui/material";

export default function SizeForm({size, changeSize}){
    return(
        <FormControl fullWidth>
            <InputLabel id="size-label">Size Form</InputLabel>
            <Select
                labelId="size-label"
                id="size-select"
                value={size}
                label="Size"
                onChange={changeSize}
            >
                <MenuItem value={1}>Small</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>Large</MenuItem>
            </Select>
         </FormControl>
    )
}