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
    FormControlLabel,
    Card,
    CardContent,
    Grid,
    CardActionArea
  } from "@mui/material";
import GridIngredient from "./grid-ingredient";
import BackBtn from "../shared-components/back-btn";
export default function BuyIngredients(props) {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsView, setIngredientsView] = useState(null);
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
                setIngredients(data);
                setIngredientsView(data.map((ingredient, index) => (
                    <GridIngredient ingredient={ingredient} index={index} />
                )))
            })
    }

    return (
        <div>
            <BackBtn className="BackBtnContainer" endPoint="../options"/>
            <Box sx={{ flexGrow: 1, marginTop: 10 }}>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 10, sm: 2, md: 3 }}>
                    {ingredientsView}
                </Grid>
            </Box>
        </div>
    )
}
