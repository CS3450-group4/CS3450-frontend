import {
    Box,
    Grid,
  } from "@mui/material";
import { useEffect, useState } from "react";
import DrinkCard from  "./drink-card"
import { useNavigate } from "react-router-dom";
import "./customer.css"


export default function MenuGrid() {
    let navigation = useNavigate()
    const[drinkList, setDrinkList] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/menu/`,{
            method: 'GET',
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
    })
        .then((res) => res.json())
        .then(
          (data) => {
            setDrinkList(data)
          }
        )
    }

    const gridItems = drinkList.map((drink, index) => {
        var inStock = true;
        drink.ingredientList.forEach(ingredient => {
            if (ingredient.stock <= 0) {
                inStock = false
            }
        })
        if(inStock) {
            return(
                <Grid item xs={3} key={index}>
                    <DrinkCard menuitem={drink}></DrinkCard>
                </Grid>
            )
        }
    });

    return( 
        <Box className="Menu">
            <Grid container className="GridContainer" rowSpacing={4} columnSpacing={{ xs: 10, sm: 5, md: 3 }} alignItems="stretch" justifyContent="center">
                {gridItems}
            </Grid>
        </Box>
        
    )
}
