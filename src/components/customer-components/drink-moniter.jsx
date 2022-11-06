import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function DrinkMoniter() {
    const [custOrders, setCustOrders] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/orders/`)
        .then((res) => res.json())
        .then(
          (data) => {
            var custOrders = []
            data.forEach(order => {
                if(order.user == window.localStorage.getItem('curUserID')) {
                    if(order.orderStatus === "forPickup") {
                        custOrders.push(order)
                    }
                }
            });
            setCustOrders(custOrders)
            console.log(custOrders)
          }
        )
    }

    if(custOrders.length !== 0) {
        return(
            <Stack direction="row">
                <Typography> ORDER READY FOR PICKUP</Typography>
            </Stack>
        )
    } else {
        <Typography>NO ORDERS READY</Typography>
    }
    
}