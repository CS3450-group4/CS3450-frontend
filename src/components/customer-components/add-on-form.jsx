import { FormControl , Select, MenuItem, InputLabel, Button, Menu, createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function AddOnForm({ingredients, addIngredient}){
    const [newIngs, setNewIngs] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { palette } = createTheme();
    const theme = createTheme({
    palette: {
        mygrey: palette.augmentColor({
        color: {
            main: "#3A3A3A"
        }
        })
    }
    });


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
        fetch(`http://localhost:8000/api/ingredient/`, {
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
    })
        .then((res) => res.json())
        .then(
          (data) => {
            var ings = []
            var oldIngNames = []
            ingredients.forEach(ing => {
                oldIngNames.push(ing.name)
            })
            data.forEach(ingredient => {
                if(!ingredient.isMilk) {
                    if(oldIngNames.findIndex(element => element === ingredient.name) === -1) {
                        ings.push(ingredient)
                    }
                }
            });
            setNewIngs(ings)
          }
        )
    }
    return(
        <Box>
            <ThemeProvider theme={theme}>
                <Button id="demo-customized-button"
                color="mygrey"
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
                    {newIngs.map((ing, index) => <MenuItem onClick={() => {handleClose(); addIngredient(ing)}}
                    key={index}>{ing.name}</MenuItem>)}
                </Menu>
            </ThemeProvider>
        </Box>
    )
}
