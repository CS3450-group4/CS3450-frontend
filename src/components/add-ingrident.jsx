import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    FormGroup,
    FormControl,
    Checkbox,
    Typography,
    Paper,
    InputLabel,
    MenuItem,
    Select,
    FormControlLabel
  } from "@mui/material";
export default function AddIngrident(props) {
    const [ingridentName, setIngridentName] = useState("");
    const [ingridentWholeSaleCost, setIngridentWholeSaleCost] = useState(0);
    const [ingridentRetailCost, setIngridentRetailCost] = useState(0);
    const [initalStock, setInitalStock] = useState(0);
    const [amountOptions, setAmountOptions] = useState(null);
    const [isIngridentMilk, setIsIngridentMilk] = useState(false)

    const optionObj = {
        yesNo: 1,
        SML: 2,
    }

    const optionStrObj = {
        yesNo: "Yes, No",
        SML: "Less, Regular, Extra",
    }
    
    function handleNameChange(event) {
        setIngridentName(event.target.value);
    }

    function handleNumberChange(event){
        if (event.target.id == "RetailCost") setIngridentRetailCost(event.target.value);
        else if (event.target.id == "WholeSaleCost") setIngridentWholeSaleCost(event.target.value);
        else if (event.target.id == "InitalStock") setInitalStock(event.target.value);
        else console.log("sad")
    }

    function handleMilkChange(event) {
        setIsIngridentMilk(event.target.checked);
        
    }

    function handleNewOptions(event) {
        setAmountOptions(event.target.value)
    }

    function showOptions() {
        if (!isIngridentMilk) {
            return (
                <FormControl fullWidth>
                    <InputLabel id="options-label">Options</InputLabel>
                    <Select 
                        labelId="options-label"
                        id="options"
                        value={amountOptions}
                        label="Options"
                        onChange={handleNewOptions}
                    >
                        <MenuItem value={optionStrObj.yesNo} key={optionStrObj.yesNo}>Yes, No</MenuItem>
                        <MenuItem value={optionStrObj.SML} key={optionStrObj.SML}>Less, Regular, Extra</MenuItem>
                    </Select>
                </FormControl>
            )
        }
    }

    function processIngrident() {
        const newIngrident = {
            name: ingridentName,
            stock: initalStock,
            retailCost: ingridentRetailCost,
            wholeSaleCost: ingridentWholeSaleCost,
            isMilk: isIngridentMilk,
            options: 0
        }
        if (!isIngridentMilk) {
            newIngrident.options = optionObj[Object.keys(optionStrObj).find(key => optionStrObj[key] == amountOptions)]
        }

        try {
            fetch(`http://localhost:8000/api/ingredient/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(newIngrident),
              }).then((res) => res.json())
              .then(
                (data) => {
                    console.log(data)
                    setIngridentName("");
                    setIngridentRetailCost(0);
                    setIngridentWholeSaleCost(0);
                    setInitalStock(0);
                    setIsIngridentMilk(false);
                    setAmountOptions(null);
                }
              )
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Box className={props.className}>
            <Stack direction="column" spacing={3}>
                <Typography variant="h4">Add New Ingrident</Typography>
                <TextField label="Name" inputProps={{ maxLength: 100 }} value={ingridentName} onChange={((newVal) => {handleNameChange(newVal)})} />
                <TextField type="number" InputProps={{inputProps: {min: 0}}} id="RetailCost" label="RetailCost" value={ingridentRetailCost} onChange={((newVal) => {handleNumberChange(newVal)})} />
                <TextField type="number" InputProps={{inputProps: {min: 0}}} id="WholeSaleCost" label="WholeSaleCost" value={ingridentWholeSaleCost} onChange={((newVal) => {handleNumberChange(newVal)})} />
                <TextField type="number" InputProps={{inputProps: {min: 0}}} id="InitalStock" label="InitalStock" value={initalStock} onChange={((newVal) => {handleNumberChange(newVal)})} />
                <FormGroup style={{"alignContent": "center"}}>
                    <FormControlLabel control={<Checkbox checked={isIngridentMilk} onChange={(newVal) => handleMilkChange(newVal)} />} label="Is Milk" />
                </FormGroup>
                {showOptions()}
                <Button onClick={() => processIngrident()}>Add</Button>
            </Stack>
        </Box>
    )
}