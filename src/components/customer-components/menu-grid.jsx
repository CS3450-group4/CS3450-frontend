import {
    Grid,
  } from "@mui/material";
import { useEffect } from "react";
import DrinkCard from  "./drink-card"
import "./menu-grid.css"


export default function MenuGrid({stateChanger, state, setFrapOrder}) {
    const milkIng = {
        name: "test milk ingredient",
        stock: 35,
        retailCost: 15,
        wholeSaleCost: 10,
        isMilk: true,
        options: 1
    }
    const otherIng = {
        name: "test non milk ingredient",
        stock: 35,
        retailCost: 15,
        wholeSaleCost: 10,
        isMilk: false,
        options: 1
    }
        const menuItem =  {
        name: "Frappichino",
        price: 11,
        size: 2,
        ingredientList: [milkIng, otherIng],
    }
    // const [milkIng, setMilkIng] = useEffect({
    //     name: "test milk ingredient",
    //     stock: 35,
    //     retailCost: 15,
    //     wholeSaleCost: 10,
    //     isMilk: true,
    //     options: 1
    // })
    
    // const [otherIng, setOtherIng] = useEffect({
    //     name: "test non milk ingredient",
    //     stock: 35,
    //     retailCost: 15,
    //     wholeSaleCost: 10,
    //     isMilk: false,
    //     options: 1
    // })
    
    // const [menuItem, setMenuItem] = useEffect({
    //     name: "Frappichino",
    //     price: 11,
    //     size: 2,
    //     ingredientList: [milkIng, otherIng]
    // })

    // useEffect(() => {
    //     fetchData();
    // }, [])

    // function fetchData() {
    //     fetch(`http://localhost:8000/api/ingredients/`)
    //     .then((res) => res.json())
    //     .then(
    //       (data) => {
    //           setMilkIng(data.milkIng)
    //           setOtherIng(data.otherIng)
    //       }
    //     )
    // }

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

    const gridItems = getMenuDrinks().map((drink, index) => 
        <Grid item className="GridItem" key={index}>
            <DrinkCard menuitem={drink} stateChanger={stateChanger} state={state} setFrapOrder={setFrapOrder}></DrinkCard>
        </Grid>
    );

    return( 
        <Grid container className="GridContainer" columns={{ xs: 4, md: 12}} spacing={2}>
            {gridItems}
        </Grid>
    )
}