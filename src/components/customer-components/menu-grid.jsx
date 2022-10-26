import {
    Grid,
    Box,
    Button
  } from "@mui/material";
import { useEffect, useState } from "react";
import DrinkCard from  "./drink-card"
import "../main-view-components/general.css"
import { useNavigate } from "react-router-dom";


export default function MenuGrid({setFrapOrder}) {
    let navigation = useNavigate()
    const[drinkList, setDrinkList] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/menu/`)
        .then((res) => res.json())
        .then(
          (data) => {
            setDrinkList(data)
          }
        )
    }

    const gridItems = drinkList.map((drink, index) => 
        <Grid item className="GridItem" key={index} style={{display: 'flex'}}>
            <DrinkCard menuitem={drink} setFrapOrder={setFrapOrder}></DrinkCard>
        </Grid>
    );

    return( 
        <Box>
            <Grid container className="GridContainer" alignItems="stretch" >
                {gridItems}
            </Grid>
            <Button onClick={() => {navigation("../cart", {replace: true})}}>Go To Cart</Button>
        </Box>
        
    )
}