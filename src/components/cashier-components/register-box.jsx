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
            var baristadrink = []
            data.forEach(drinkIngs => {
                if(drinkIngs.orderStatus === "unfullfilled") {
                    tempList.push(drinkIngs)
                } else {
                    baristadrink.push(drinkIngs)
                }
            })
            setOrders(tempList)
            console.log(baristadrink)
            // console.log(tempList)
          }
        )
    }
    function updateOrderStatus(changedOrder) {
        console.log(changedOrder)
        // try {
            //     fetch(`http://localhost:8000/api/orders/${order.id}/`, {
            //         method: 'PUT',
            //         mode: 'cors',
            //         headers: {
            //           'Content-Type': 'application/json',
            //         },
            //         'body': JSON.stringify(changedOrder),
            //       })
            // } catch (error) {
            //     console.log(error);
            // }
    }
    function sendToBarista(order) {
        // console.log(order)
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
            updateOrderStatus(order)
        }
    }

    function OrderItem() {
        return orders.map((order, index) => {
            return(
                <Paper elevation={3} variant="outlined" key={index} >
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