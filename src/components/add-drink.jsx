import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    FormControl,
    Checkbox,
    Typography,
    FormControlLabel
  } from "@mui/material";
export default function AddDrink(props) {
    const [drinkName, setDrinkName] = useState("");
    const [drinkPrice, setDrinkPrice] = useState(0);
    const [availableIngredients, setAvailableIngredients] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isNameError, setIsNameError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [allIngredients, setAllIngredients] = useState(null)

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => res.json())
          .then(
            (data) => {
                data = data.filter(ingrident => !ingrident.isMilk );
                const ingredientArray = {};
                const allIngredients = {};
                data.forEach((ingredient) => {
                    ingredientArray[ingredient.name] = false;
                    allIngredients[ingredient.name] = ingredient;
                })
                setSelectedIngredients(ingredientArray);
                setAllIngredients(allIngredients);
                createIngredientList(data);
            })
    }

    function handleIngredientChecked(event, name) {
        selectedIngredients[name] = event.target.checked;
        setSelectedIngredients(selectedIngredients);
        console.log(selectedIngredients);
    }

    function createIngredientList(data) {
        console.log("data")
        setAvailableIngredients(
            data.map((ingredient, index) => (
                <FormControlLabel key={index} control={<Checkbox checked={selectedIngredients[index]} onChange={(newVal) => handleIngredientChecked(newVal, ingredient.name)} />} label={ingredient.name} />
            ))
        );
    }

    function handleNameChange(event) {
        setIsNameError(false);
        setDrinkName(event.target.value);
    }

    function handlePriceChange(event) {
        setIsPriceError(false);
        setDrinkPrice(event.target.value);
    }

    function addDrink() {
        if (drinkName == "") setIsNameError(true);
        if (drinkPrice == 0) setIsPriceError(true);
        if (drinkPrice == 0 || drinkName == "") return;
        const newDrink = {
            name: drinkName,
            price: drinkPrice,
            ingredientList: {},
        }
        for (const ingredientName in selectedIngredients) {
            if (selectedIngredients[ingredientName]) newDrink.ingredientList[ingredientName] = allIngredients[ingredientName]
        }

        fetch(`http://localhost:8000/api/menu/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            'body': JSON.stringify(newDrink),
          }).then((res) => res.json())
          .then(
            (data) => {
                console.log(data)
                setDrinkName("");
                setDrinkPrice("");
                fetchData();
            }
          )
    }

    return (
        <Box className={props.className}>
            <Stack direction="column" spacing={3}>
                <Typography variant="h4">Add New Drink</Typography>
                <TextField error={isNameError} label="Name" inputProps={{ maxLength: 100 }} value={drinkName} onChange={((newVal) => {handleNameChange(newVal)})} />
                <TextField error={isPriceError} type="number" InputProps={{inputProps: {min: 0}}} id="Price" label="Price" value={drinkPrice} onChange={((newVal) => {handlePriceChange(newVal)})} />
                <FormControl className={props.ingredientClassName}>
                    {availableIngredients}
                </FormControl>
                <Button onClick={() => addDrink()}>Add</Button>
            </Stack>
        </Box>
    )
}