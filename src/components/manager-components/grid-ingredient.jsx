import {useState, useEffect } from "react";
import {
    Stack,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Grid,
    CardActionArea,
  } from "@mui/material";
export default function GridIngredient(props) {
    const ingredient = props.ingredient;
    const index = props.index;
    const [addingAmount, setAddingAmount] = useState(0);
    const [itemStock, setItemStock] = useState(ingredient.stock);
    const [managerData, setManagerData] = useState(null);

    function handleInputChange(event) {
        setAddingAmount(event.target.value)
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
              if (data.userinfo.balance < addingAmount * ingredient.wholeSaleCost) alert("Balance Too Low for Inital Stock!")
              else {
                data.userinfo.balance = data.userinfo.balance - (addingAmount * ingredient.wholeSaleCost)
                updateManagerBalance(data);
                purchaseStock();
              }
          }
        )
    }

    function purchaseStock() {
        ingredient.stock = +ingredient.stock + +addingAmount
        try {
            fetch(`http://localhost:8000/api/ingredient/${ingredient.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
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
                    <Button onClick={() => getManagerData()}>Buy</Button>
                </Stack>
            </CardActionArea>
        </Card>
    </Grid>
    )
}
