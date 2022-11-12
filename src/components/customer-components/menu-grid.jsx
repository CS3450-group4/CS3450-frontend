import {
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

    function GridItem({drink}) {
        var inStock = true;
        drink.ingredientList.forEach(ingredient => {
            if (ingredient.stock <= 0) {
                inStock = false
            }
        })
        if(inStock) {
            return(
                <Grid item className="GridItem" style={{display: 'flex'}}>
                    <DrinkCard menuitem={drink}></DrinkCard>
                </Grid>
            )
        }
    }

    const gridItems = drinkList.map((drink, index) =>
        <GridItem drink={drink} key={index}></GridItem>
    );

    return( 
        <Grid container className="GridContainer" alignItems="stretch" >
            {gridItems}
        </Grid>
    )
}
