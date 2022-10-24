import {
    Grid,
  } from "@mui/material";
import { useEffect, useState } from "react";
import DrinkCard from  "./drink-card"
import "./menu-grid.css"


export default function MenuGrid({stateChanger, state, setFrapOrder}) {
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
            <DrinkCard menuitem={drink} stateChanger={stateChanger} state={state} setFrapOrder={setFrapOrder}></DrinkCard>
        </Grid>
    );

    return( 
        <Grid container className="GridContainer" alignItems="stretch" >
            {gridItems}
        </Grid>
    )
}