import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RegisterBox(){
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/orders/`)
        .then((res) => res.json())
        .then(
          (data) => {
            var tempList = []
            data.forEach(drinkIngs => {
                if(drinkIngs.orderStatus === "unfullfilled") {
                    tempList.push(drinkIngs)
                }
            })
            setOrders(tempList)
            // console.log(tempList)
          }
        )
    }

    function sendToBarista(order) {
        console.log(order)
        var outOfStock = false
        for (const [drink, ings] of Object.entries(order.ingredientList)) {
            for(const ing of ings) {
                if (ing.stock < ing.options) {
                    outOfStock = true;
                }
            }
        }
        if (outOfStock) {
            alert("DON'T Have Enough INGS")
            // TODO: Send Back To Customer
        } else {
            order.orderStatus = "readyToFullfill"
            console.log(order)
            // try {
            //     fetch(`http://localhost:8000/api/orders/`, {
            //         method: 'POST',
            //         mode: 'cors',
            //         headers: {
            //           'Content-Type': 'application/json',
            //         },
            //         'body': JSON.stringify(order),
            //       })
            // } catch (error) {
            //     console.log(error);
            // }
        }
    }

    function OrderItem() {
        return orders.map((order) => {
            return(
                <Paper elevation={3} variant="outlined">
                    <Typography>Customer {order.user}</Typography>
                    <Typography>Price ${(order.price/100).toFixed(2)}</Typography>
                    <Button onClick={() => {sendToBarista(order)}} variant={"contained"}> Send to Barista</Button>
                </Paper>
            )
        })
    }

    return(
        <Box>
            {OrderItem()}
        </Box>
    )
}