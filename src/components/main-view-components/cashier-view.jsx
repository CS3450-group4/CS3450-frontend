import {
    Box,
  } from "@mui/material";
import CompositeTitleHeader from "../composite-header";
import StickyFooter from "../sticky-footer";
import "./../../App.css";
import "./general.css";
import HoursAdder from "../hours-adder";
import OrdersBox from "../cashier-components/cash-orders-box";

export default function CashierView() {
    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer">
                <OrdersBox></OrdersBox>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <HoursAdder className="HoursAdder"/>
                </StickyFooter>
            </Box>
        </div>
    )
}