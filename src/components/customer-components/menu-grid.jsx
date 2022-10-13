import {useState} from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    Grid,
    Typography,
  } from "@mui/material";
import DrinkCard from  "./drink-card"
import "./menu-grid.css"

const menuItem =  {
    name: "Frappichino",
    price: 11,
    size: 2,
    ingredientList: ["Soy Milk", "Caramel", "Cinnamon", "Ice"]
}

export default function MenuGrid() {

    function getMenuDrinks(){
        const drinkList = [];
        for (var count = 10; count > 0; count--) {
            drinkList.push(menuItem)
        }
        return (
            drinkList
        )
        // TODO: Fetch drinks on the menu from the database
    }


    const gridItems = getMenuDrinks().map((drink) => 
        <Grid item className="GridItem" >
            <DrinkCard menuitem={drink}></DrinkCard>
        </Grid>
    );

    return( 
        <Grid container className="GridContainer" columns={{ xs: 4, md: 12}} spacing={2}>
            {gridItems}
        </Grid>
    )
}