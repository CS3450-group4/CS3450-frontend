import {
    Box,
    Typography
  } from "@mui/material";
import { useState } from "react";
import CompositeTitleHeader from "../composite-header";
import StickyFooter from "../sticky-footer";
import "./../../App.css";
import "./general.css";
import MenuGrid from  "../customer-components/menu-grid"
import OrderBox from "../customer-components/order-box";

export default function CustomerView() {
    const [isOrdering, setIsOrdering] = useState(true)

    function CustomerAction() {
        if (isOrdering) {
            return <MenuGrid stateChanger={setIsOrdering} state={isOrdering}/>; 
        }  
        return <OrderBox stateChanger={setIsOrdering} state={isOrdering}/>;
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