import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    FormControl,
    Checkbox,
    Typography,
    FormControlLabel,
    MenuItem,
    InputLabel,
    Select,
  } from "@mui/material";
import BackBtn from "../shared-components/back-btn";
import "./manager.css"
export default function AddDrink(props) {
    const [drinkName, setDrinkName] = useState("");
    const [drinkPrice, setDrinkPrice] = useState(0);
    const [availableIngredients, setAvailableIngredients] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isNameError, setIsNameError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [allIngredients, setAllIngredients] = useState(null);
    const [selectedMilk, setSelectedMilk] = useState(null);
    const [availableMilks, setAvailableMilks] = useState(null);
    const [isMilkSelectionError, setIsMilkSelectionError] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Token " + window.localStorage.getItem('token')
            },
          })
          .then((res) => res.json())
          .then(
            (data) => {
                const milks = data.filter(ingredient => ingredient.isMilk);
                createAvailableMilks(milks)
                const ingredientsNoMilks = data.filter(ingredient => !ingredient.isMilk);
                const ingredientArray = {};
                const allIngredients = {};
                data.forEach((ingredient) => {
                    ingredientArray[ingredient.name] = false;
                    allIngredients[ingredient.name] = ingredient;
                })
                setSelectedIngredients(ingredientArray);
                setAllIngredients(allIngredients);
                createIngredientList(ingredientsNoMilks);
            })
    }

    function createAvailableMilks(milks) {
        setAvailableMilks(
            milks.map((milk, index) => (
                <MenuItem value={milk.name} key={index}>{milk.name}</MenuItem>
            ))
        )
    }

    function handleIngredientChecked(event, name) {
        selectedIngredients[name] = event.target.checked;
        setSelectedIngredients(selectedIngredients);
        console.log(selectedIngredients);
    }

    function createIngredientList(data) {
        setAvailableIngredients(
            data.map((ingredient, index) => (
                <FormControlLabel key={index} control={<Checkbox checked={selectedIngredients[index]} onChange={(newVal) => handleIngredientChecked(newVal, ingredient.name)} />} label={<Typography color={'black'}>{ingredient.name}</Typography>} />
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
        if (selectedMilk == null) setIsMilkSelectionError(true);
        if (drinkPrice == 0 || drinkName == "") return;
        const newDrink = {
            name: drinkName,
            price: drinkPrice,
            ingredientList: [],
        }
        for (const ingredientName in selectedIngredients) {
            if (selectedIngredients[ingredientName]) newDrink.ingredientList.push(allIngredients[ingredientName]);
        }
        newDrink.ingredientList.push(allIngredients[selectedMilk]);

        fetch(`http://localhost:8000/api/menu/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Token " + window.localStorage.getItem('token')
            },
            'body': JSON.stringify(newDrink),
          }).then((res) => res.json())
          .then(
            (data) => {
                console.log(data)
                setDrinkName("");
                setDrinkPrice("");
                setSelectedMilk(null);
                setSelectedIngredients([]);
                setAvailableIngredients([]);
                fetchData();
            }
          )
    }

    function handleNewMilkSelection(event) {
        setIsMilkSelectionError(false);
        setSelectedMilk(event.target.value);
    }

    return (
        <Box className={props.className}>
            <BackBtn className="BackBtnContainer" endPoint="../options"/>
            <Stack direction="column" spacing={3}>
                <Typography variant="h4" color={'black'}>Add New Drink</Typography>
                <TextField error={isNameError} label="Name" inputProps={{ maxLength: 16 }} value={drinkName} onChange={((newVal) => {handleNameChange(newVal)})} />
                <TextField error={isPriceError} type="number" InputProps={{inputProps: {min: 0}}} id="Price" label="Price" value={drinkPrice} onChange={((newVal) => {handlePriceChange(newVal)})} />
                <FormControl fullWidth>
                    <InputLabel id="select-auth-label">Default Milk</InputLabel>
                    <Select
                        error={isMilkSelectionError}
                        labelId="default-milk-label"
                        id="default-milk"
                        value={selectedMilk}
                        label="Default Milk"
                        onChange={handleNewMilkSelection}

                    >
                        {availableMilks}
                    </Select>
                </FormControl>
                <FormControl className={props.ingredientClassName}>
                    {availableIngredients}
                </FormControl>
                <Button onClick={() => addDrink()}>Add</Button>
            </Stack>
        </Box>
    )
}
