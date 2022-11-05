import {
    Box, Button,
  } from "@mui/material";
import { useEffect, useState } from "react";
import CompositeTitleHeader from "../shared-components/composite-header";
import StickyFooter from "../shared-components/sticky-footer";
import "./../../App.css";
import "./general.css";
import MenuGrid from  "../customer-components/menu-grid"
import OrderBox from "../customer-components/cust-order-box";
import CustomerCartBox from "../customer-components/customer-cart-box";
import { Route, Routes, useNavigate } from "react-router-dom";
import DrinkMoniter from "../customer-components/drink-moniter";

export default function CustomerView() {
    const [frapOrder, setFrapOrder] = useState({})
    const [customerCart, setCart] = useState([])
    let navigation = useNavigate()
    useEffect(() => {
        navigation("menu")
    }, [])

    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer" >
                <Routes>
                    <Route path="menu" element={<MenuGrid setFrapOrder={setFrapOrder}/>} />
                    <Route path="drink" element={<OrderBox frapOrder={frapOrder} setCart={setCart} customerCart={customerCart}/>} />
                    <Route path="cart" element={<CustomerCartBox customerCart={customerCart} setCart={setCart} setFrapOrder={setFrapOrder}/>} />
                </Routes>
                {/* <CustomerAction/>   */}
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <DrinkMoniter></DrinkMoniter>
                </StickyFooter>
            </Box>
        </div>
    )
}