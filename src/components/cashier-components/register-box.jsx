import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { resolveTypeReferenceDirective } from "typescript";

export default function RegisterBox(){
    const [orders, setOrders] = useState([])
    const [update, forceUpdate] = useState(true)

    useEffect(() => {
        fetchData();
    }, [])

    function rerender() {
        forceUpdate(!update)
    }

    function fetchData() {
        fetch(`http://localhost:8000/api/orders/`)
        .then((res) => res.json())
        .then(
          (data) => {
            var tempList = []
            var alldrink = []
            data.forEach(drinks => {
                alldrink.push(drinks)
                if(drinks.orderStatus === "unfullfilled") {
                    tempList.push(drinks)
                }
            })
            setOrders(tempList)
            console.log(alldrink)
          }
        )
    }
    function updateOrderStatus(changedOrder, id) {
        console.log(changedOrder)
        try {
            fetch(`http://localhost:8000/api/orders/${id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(changedOrder),
                })
        } catch (error) {
            console.log(error);
        }
    }
    function sendToBarista(order) {
        var changedOrder = {
            price: order.price,
            user: order.user,
            orderStatus: "readyToFullfill",
            ingredientList: order.ingredientList
        }
        updateOrderStatus(changedOrder, order.id)
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