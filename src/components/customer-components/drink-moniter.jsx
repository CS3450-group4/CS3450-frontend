import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DrinkMoniter({setToOrderManage}) {
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
          }
        )
    }
    return(
        <Stack direction="row" spacing={2}>
            <Button onClick={() => {setToOrderManage(true)}} variant={"contained"}>Order Manage</Button>
        </Stack>
        
    )
    
}