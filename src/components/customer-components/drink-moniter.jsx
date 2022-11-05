import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import user from "../tempObject";

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
                if(order.user == user.id) {
                    custOrders.push(order)
                }
            });
            setCustOrders(custOrders)
          }
        )
    }

    return(
        console.log(custOrders)
        // <Typography>Drink Moniter</Typography>
    )
}