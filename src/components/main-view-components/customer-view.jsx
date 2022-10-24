import {
    Box, Button,
  } from "@mui/material";
import { useState } from "react";
import CompositeTitleHeader from "../composite-header";
import StickyFooter from "../sticky-footer";
import "./../../App.css";
import "./general.css";
import MenuGrid from  "../customer-components/menu-grid"
import OrderBox from "../customer-components/cust-order-box";
import CustomerCartBox from "../customer-components/customer-cart-box";

export default function CustomerView() {
    const [customerState, setCustomerState] = useState("menu")
    const [frapOrder, setFrapOrder] = useState(null)
    const [customerCart, setCart] = useState([])


    function CustomerAction() {
        if (customerState === "menu") {
            return (
                <Box>
                    <MenuGrid stateChanger={setCustomerState} state={customerState} setFrapOrder={setFrapOrder}/>
                    <Button onClick={() => {setCustomerState("cart")}}>Go To Cart</Button>
                </Box>
            )
        }  else if (customerState === "drink") {
            return <OrderBox stateChanger={setCustomerState} state={customerState} frapOrder={frapOrder} setCart={setCart} customerCart={customerCart}/>;
        } else if (customerState === "cart") {
            return <CustomerCartBox customerCart={customerCart} setCart={setCart} setCustomerState={setCustomerState}></CustomerCartBox>
        }
    }

    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer" >
                <CustomerAction/>  
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    Replace With Drink Monitor
                </StickyFooter>
            </Box>
        </div>
    )
}