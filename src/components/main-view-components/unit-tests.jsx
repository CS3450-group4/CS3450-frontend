import {
    Box,
  } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CompositeTitleHeader from "../shared-components/composite-header";
import StickyFooter from "../shared-components/sticky-footer";
import RunAllTests from "../unit-tests/test-driver";
import "./../../App.css";
import "./general.css";
export default function UnitTests() {
    let navigation = useNavigate()
    useEffect(() => {
        navigation("runAll")
    }, [])
    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer">
                <Routes>
                    <Route path="runAll" element={<RunAllTests className="UnitTestContainer"/>} />
                </Routes>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter />

            </Box>
        </div>
    )
}