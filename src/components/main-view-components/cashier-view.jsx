import {
    Box, Typography,
  } from "@mui/material";
import CompositeTitleHeader from "../shared-components/composite-header";
import StickyFooter from "../sticky-footer";
import "./../../App.css";
import "./general.css";
import HoursAdder from "../hours-adder";
import RegisterBox from "../cashier-components/register-box";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CashierView() {
    let navigation = useNavigate()
    useEffect(() => {
        navigation("register")
    }, [])

    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer">
                <Routes>
                    <Route path="register" element={<RegisterBox></RegisterBox>} />
                </Routes>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <HoursAdder className="HoursAdder"/>
                </StickyFooter>
            </Box>
        </div>
    )
}