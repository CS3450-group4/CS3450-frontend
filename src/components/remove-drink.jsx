import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
  } from "@mui/material";
export default function RemoveDrinkView(props) {
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [isSuccessfulRemoval, setIsSuccessfulRemoval] = useState("secondary");
    const [drinkName, setDrinkName] = useState("");

    function updateDrinkName(event) {
        setIsSuccessfulRemoval("secondary")
        setIsInvalidInput(false);
        setDrinkName(event.target.value);
    }

    function findDrink() {
        fetch(`http://localhost:8000/api/menu/${drinkName}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => res.json())
          .then((data) => {
            removeDrink(data)
            }).catch((e) => {
                setIsInvalidInput(true);
            })
    }

    function removeDrink(drink) {
        fetch(`http://localhost:8000/api/menu/${drink.name}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => res.json())
          .then((data) => {
            setIsSuccessfulRemoval("success");
            }).catch((e) => {
                alert("Drink Removal Failed!");
                console.log(e);
            })
    }
    return (
        <Box className={props.className}>
            <Stack direction="column" spacing={3}>
                <TextField label="Drink Name" error={isInvalidInput} value={drinkName} onChange={((newVal) => updateDrinkName(newVal))}></TextField>
                <Button onClick={() => findDrink() }>Remove</Button>
            </Stack>
        </Box>
    )
}