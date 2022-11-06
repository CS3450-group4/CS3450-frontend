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
    const [orders, setOrders] = useState([])

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

    function fetchOrderData() {
        fetch('https://localhost:8000/api/orders/')
        .then((res) => res.json())
        .then(
            (data) => {
                var tempList = []
                data.forEach(drinkIngs => {
                    if (drinkIngs.orderStatus === "unfulfilled") {
                        tempList.push(drinkIngs)
                    }
                })
                setOrders(tempList)
            }
        )
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
                <FormControlLabel key={index} control={<Checkbox checked={selectedIngredients[index]} onChange={(newVal) => handleIngredientChecked(newVal, ingredient.name)} />} label={ingredient.name} />
            ))
        );
    }

    function createIngredients(data) {
        setAvailableIngredients(
            data.map((drinkIngs, index) => {
                <FormControlLabel key={index} control={<Checkbox checked={selectedIngredients[index]} onChange{(newVal => handleIngredientChecked(newVal, ingredient.name0} />} label={ingredient.name} />
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

    function handleNewMilkSelection(event) {
        setIsMilkSelectionError(false);
        setSelectedMilk(event.target.value);
    }

    return (
        <Box className={props.className}>
            <button onClick={() => this.handleClick()}>
                Click me
            </button>
            <Stack direction="column" spacing={3}>
                <Typography variant="h4">Add New Drink</Typography>
                <TextField error={isNameError} label="Name" inputProps={{ maxLength: 100 }} value={drinkName} onChange={((newVal) => {handleNameChange(newVal)})} />
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
