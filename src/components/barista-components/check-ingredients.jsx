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
    GridItem,
    List
  } from "@mui/material";
export default function AddDrink(props) {
    const [ingredients, setIngredients] = useState([]);
    const [currentDrink, setCurrentDrink] = useState(null);
    const [isGrabbed, setIsGrabbed] = useState([]);
    const [disableMakeDrink, setDisableMakeDrink] = useState(true);
    let itemsGrabbedCount = 0;
    useEffect(() => {
        fetchOrderData();
    }, [])


    function fetchOrderData() {
        fetch('http://localhost:8000/api/orders/')
        .then((res) => res.json())
        .then(
            (data) => {
                console.log("GRABBING");
                var tempList = []
                data.forEach(order => {
                    if (order.orderStatus === "readyToFullfill") {
                        tempList.push(order)
                    }
                })
                console.log(tempList);
                if (tempList.length == 0) return;
                setCurrentDrink(tempList[0]);
                buildButtons(tempList[0]);
            }
        )
    }

    function checkIngrident(event, index, drink) {
        isGrabbed[index] = event.target.checked;
        event.target.disabled=true;
        setIsGrabbed(isGrabbed);
        console.log(isGrabbed);
        itemsGrabbedCount++;
        console.log("BELOW")
        console.log(Object.entries(drink.ingredientList)[0])
        if (itemsGrabbedCount == Object.entries(drink.ingredientList)[0][1].length) {
            setDisableMakeDrink(false);
        }
    }

    function buildButtons(drink) {
        setIsGrabbed([]);
        setIngredients(Object.entries(drink.ingredientList)[0][1].map((ingrident, index) =>
            <FormControlLabel key={index} control={<Checkbox  checked={isGrabbed[index]} onChange={(newVal) => checkIngrident(newVal, index, drink)} /> } label={ingrident["name"]} />
        ))
    }

    async function buildDrink() {
        // Get all the ingridents of the current drink
        // Remove ingridents from inventory+
        // Change status of order
        // Reset isGrabbed, currentDrink, disableMakeDrink, ingridents
        console.log("HERE")
        console.log(currentDrink)
        await Object.entries(currentDrink.ingredientList)[0][1].forEach(ingredient => {
            console.log(Object.entries(currentDrink.ingredientList)[0][1])
            // console.log(Object.entries(currentDrink.ingredientList)[1][1])
            ingredient.stock -= 
            fetch(`http://localhost:8000/api/ingredient/${ingredient.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(ingredient),
                }).then((res) => res.json())
                .then((data) => {
                    currentDrink.orderStatus = "forPickup"
                })
        })
        console.log("DONE WITH INGRED")
        await fetch(`http://localhost:8000/api/orders/${currentDrink.id}/`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(currentDrink),
            }).then((res) => res.json())
            .then((data) => {
                setCurrentDrink(null);
                setIsGrabbed([]);
                setDisableMakeDrink(true);
                setIngredients([]);
                console.log("BEFORE END");
            }) 
        await resetDynamicData()
        console.log("END");
        setTimeout(fetchOrderData(), 1000);
    }

    async function resetDynamicData() {
        setCurrentDrink(null);
        setIsGrabbed([]);
        setDisableMakeDrink(true);
        setIngredients([]);
        // buildButtons(currentDrink);
    }
    
    return ( 
        <Box>
            <Stack>
                <FormControl className={props.ingredientClassName}>
                    {ingredients}
                </FormControl>
                <Button disabled={disableMakeDrink} onClick={() => buildDrink()}>Make Drink</Button>
            </Stack>
        </Box> 
    )
}
