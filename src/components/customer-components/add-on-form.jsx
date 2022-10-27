import { FormControl , Select, MenuItem, InputLabel, Button, Menu } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function AddOnForm({ingredients, addIngredient}){
    const [newIngs, setNewIngs] = useState({})
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        fetchData();
    }, [anchorEl])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`)
        .then((res) => res.json())
        .then(
          (data) => {
            var ings = {}
            var oldIngNames = []
            for(let keyVal in ingredients) {
                oldIngNames.push(ingredients[keyVal].name)
            }
            data.forEach(ingredient => {
                if(!ingredient.isMilk) {
                    if(oldIngNames.findIndex(element => element === ingredient.name) === -1) {
                        ings[ingredient.name] = ingredient
                    }
                }
            });
            setNewIngs(ings)
          }
        )
    }
    return(
        <Box>
            <Button id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}>
                Add Ons
            </Button>
            <Menu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
                {Object.keys(newIngs).map((keyVal, index) => <MenuItem onClick={() => {
                    handleClose()
                    addIngredient(newIngs[keyVal])}}
                key={index}> {newIngs[keyVal].name} </MenuItem>)}
            </Menu>
        </Box>
    )
}