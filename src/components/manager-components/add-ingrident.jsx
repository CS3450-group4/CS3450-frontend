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
import BackBtn from "../shared-components/back-btn";
export default function AddIngrident(props) {
    const [ingridentName, setIngridentName] = useState("");
    const [ingridentWholeSaleCost, setIngridentWholeSaleCost] = useState(0);
    const [ingridentRetailCost, setIngridentRetailCost] = useState(0);
    const [initalStock, setInitalStock] = useState(0);
    const [amountOptions, setAmountOptions] = useState(null);
    const [isIngridentMilk, setIsIngridentMilk] = useState(false);

    function refreshPage() {
        window.location.reload(false);
    }

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
        else console.log("BACKEND-ERROR # 121")
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
    function updateManagerBalance(data) {
        try {
            fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
                'body': JSON.stringify(data),
              })
        } catch (error) {
            console.log(error);
        }
    }

    function getManagerData() {
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`,{
            method: 'GET',
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
    })
        .then((res) => res.json())
        .then(
          (data) => {
              if (data.userinfo.balance < +ingridentWholeSaleCost * +initalStock) alert("Balance Too Low for Inital Stock!");
              else if (ingridentName == "" || (amountOptions == null && !isIngridentMilk)) alert("Missing Fields!");
              else {
                data.userinfo.balance = data.userinfo.balance - (+ingridentWholeSaleCost * +initalStock)
                updateManagerBalance(data);
                processIngrident();
              }
          }
        )
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
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
                'body': JSON.stringify(newIngrident),
              }).then((res) => res.json())
              .then(
                (data) => {
                    setIngridentName("");
                    setIngridentRetailCost(0);
                    setIngridentWholeSaleCost(0);
                    setInitalStock(0);
                    setIsIngridentMilk(false);
                    setAmountOptions(null);
                    // refreshPage()
                }
              )
            //   .then(refreshPage())
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Box className={props.className}>
            <BackBtn className="BackBtnContainer" endPoint="../options"/>
            <Stack direction="column" spacing={3}>
                <Typography variant="h4" color={'black'}>Add New Ingredient</Typography>
                <TextField label="Name" inputProps={{ maxLength: 100 }} value={ingridentName} onChange={((newVal) => {handleNameChange(newVal)})} />
                <TextField type="number" InputProps={{inputProps: {min: 0}}} id="RetailCost" label="RetailCost" value={ingridentRetailCost} onChange={((newVal) => {handleNumberChange(newVal)})} />
                <TextField type="number" InputProps={{inputProps: {min: 0}}} id="WholeSaleCost" label="WholeSaleCost" value={ingridentWholeSaleCost} onChange={((newVal) => {handleNumberChange(newVal)})} />
                <TextField type="number" InputProps={{inputProps: {min: 0}}} id="InitalStock" label="InitalStock" value={initalStock} onChange={((newVal) => {handleNumberChange(newVal)})} />
                <FormGroup style={{"alignContent": "center"}}>
                    <FormControlLabel control={<Checkbox checked={isIngridentMilk} onChange={(newVal) => handleMilkChange(newVal)} />} label={<Typography color={'black'}>Is Milk</Typography>}/>
                </FormGroup>
                {showOptions()}
                <Button onClick={() => getManagerData()}>Add</Button>
            </Stack>
        </Box>
    )
}
