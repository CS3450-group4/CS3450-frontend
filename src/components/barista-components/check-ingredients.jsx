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
export default function CheckIngredients() {
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
            },
          })
          .then((res) => res.json())
          .then(
            (data) => {
                const milks = data.filter(ingredient => ingredient.isMilk);
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

    
    return (
        <Box>
            {createIngredientList()}
        </Box>
    )
}
