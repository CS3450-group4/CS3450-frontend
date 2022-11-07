import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderManageBox() {
    const [pickups, setPickups] = useState([])
    const [drinkHistory, setDrinkHistory] = useState([])

    useEffect(() => {
        fetchData();
    }, [])
    function fetchData() {
        fetch(`http://localhost:8000/api/orders/`)
        .then((res) => res.json())
        .then(
          (data) => {
            var custPickups = []
            var custHistory = []
            data.forEach(order => {
                if(order.user == window.localStorage.getItem('curUserID')) {
                    if(order.orderStatus === "forPickup") {
                        custPickups.push(order)
                    }
                    if(order.orderStatus === "pickuped") {
                        custHistory.push(order)
                    }
                }
            });
            setPickups(custPickups)
            setDrinkHistory(custHistory)
          }
        )
    }
    function PickUpItems({order}) {
        return(
            <Stack direction="row">
                {
                    (order.length !== 0) ? (
                        Object.keys(order.ingredientList).map((drink, index) => {
                            return(
                                <Typography>{drink}</Typography>
                            )
                        })
                    ) : <Typography>No Pickups</Typography>
                    
                }
            </Stack>
        )
    }

    function PickUps() {
        return(
            <Box>
                {
                    (pickups.length !== 0) ? (
                        pickups.map((order, index) => {
                            return(
                                <Paper key={index}>
                                    <Typography>Price ${(order.price/100).toFixed(2)}</Typography>
                                    <PickUpItems order={order}></PickUpItems>
                                    <Button onClick={() => {console.log(order)}} variant={"contained"}> Pick Up Order</Button>
                                </Paper>
                            )
                        })
                    ) : <Typography>No Pickups</Typography>
                    
                }
            </Box>
        )
    }

    function DrinkHistory() {
        return(
            <Typography> DRINK HISTORY</Typography>
        )
    }
    return(
        <Box>
            <PickUps />
            <DrinkHistory />
        </Box>
        
    )
}