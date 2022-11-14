import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./cashier.css"

export default function RegisterBox(){
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/orders/`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
        },
    })
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
          }
        )
    }
    function updateOrderStatus(changedOrder, id) {
        const newOrders = orders.filter(order => order.id !== id)
        setOrders(newOrders)
        try {
            fetch(`http://localhost:8000/api/orders/${id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
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
        if (orders.length === 0) {
            return(
                <Grid item xs={3}>
                    <Paper elevation={3} variant="outlined" className="Order">
                        <Typography sx={{ fontSize: 24 }}> No Current Orders</Typography>
                        <Button onClick={() => {window.location.reload(false);}} variant={"contained"}> Refresh</Button>
                    </Paper>
                </Grid>
            )
        }
        return orders.map((order, index) => {
            return(
                <Grid item xs={3} key={index}>
                    <Paper elevation={3} variant="outlined" className="Order">
                        <Typography sx={{ fontSize: 22 }}>Customer {order.user}</Typography>
                        <Typography sx={{ fontSize: 18 }}>{order.size} {Object.keys(order.ingredientList)[0]}</Typography>
                        <Typography sx={{ fontSize: 18 }}>Price ${(order.price/100).toFixed(2)}</Typography>
                        <Button onClick={() => {sendToBarista(order)}} variant={"contained"}> Send to Barista</Button>
                    </Paper>
                </Grid>
            )
        })
    }

    return(
        <Box className="Register">
            <Grid container rowSpacing={4} columnSpacing={{ xs: 10, sm: 5, md: 3 }} alignItems="center" justifyContent="center">
                {OrderItem()}
            </Grid>
        </Box>
    )
}
