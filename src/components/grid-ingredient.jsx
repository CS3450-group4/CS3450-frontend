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
export default function GridIngredient(props) {
    const ingredient = props.ingredient;
    const index = props.index;
    const [addingAmount, setAddingAmount] = useState(0);
    const [itemStock, setItemStock] = useState(ingredient.stock);

    function handleInputChange(event) {
        setAddingAmount(event.target.value)
    }

    function purchaseStock() {
        ingredient.stock = +ingredient.stock + +addingAmount
        try {
            fetch(`http://localhost:8000/api/ingredient/${ingredient.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(ingredient),
              }).then((res) => res.json())
              .then(
                (data) => {
                    setItemStock(ingredient.stock);
                    setAddingAmount(0);
                }
              )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid xs={3} padding={5} paddingTop={6} key={index}>
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>{ingredient.name}</Typography>
                <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>Stock: {itemStock}</Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>Retail: ${ingredient.retailCost}</Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>WholeSale: ${ingredient.wholeSaleCost}</Typography>
            </CardContent>
            <CardActionArea>
                <Stack direction="row">
                    <TextField id={index} value={addingAmount} type="number" InputProps={{inputProps: {min: ingredient.stock}}} size="small" label="# Units" onChange={(newVal) => handleInputChange(newVal)}></TextField>
                    <Button onClick={purchaseStock}>Buy</Button>
                </Stack>
            </CardActionArea>
        </Card>
    </Grid>
    )
}