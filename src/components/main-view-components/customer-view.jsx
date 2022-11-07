import {
    Box
  } from "@mui/material";
import { useEffect, useState} from "react";
import CompositeTitleHeader from "../shared-components/composite-header";
import StickyFooter from "../shared-components/sticky-footer";
import "./../../App.css";
import "./general.css";
import MenuGrid from  "../customer-components/menu-grid"
import OrderBox from "../customer-components/cust-order-box";
import CustomerCartBox from "../customer-components/customer-cart-box";
import { Route, Routes, useNavigate } from "react-router-dom";
import DrinkMoniter from "../customer-components/drink-moniter";
import OrderManageBox from "../customer-components/order-manage-box";

export default function CustomerView() {
    let navigation = useNavigate()
    const [screen, setScreen] = useState("menu")
    useEffect(() => {
        if(screen === "order-manage") {
            navigation("order-manage")
        } else {
            navigation("menu")
        }
    }, [screen])

    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer" >
                <Routes>
                    <Route path="menu" element={<MenuGrid />} />
                    <Route path="drink" element={<OrderBox />} />
                    <Route path="cart" element={<CustomerCartBox />} />
                    <Route path="order-manage" element={<OrderManageBox />}/>
                </Routes>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <DrinkMoniter setScreen={setScreen} screen={screen}></DrinkMoniter>
                </StickyFooter>
            </Box>
        </div>
    )
}