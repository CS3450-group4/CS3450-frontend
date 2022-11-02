import {
    Typography,
    Box,
  } from "@mui/material";
import BalanceAdder from "./balance-adder";
import AuthSelector from "./auth-selector";
import "./composite-header.css"

export default function CompositeTitleHeader() {
    return (
        <Box className="TitleContainer">
            <AuthSelector className="AuthSelectorContainer"/>
            <Box className="Title">
                <Typography variant="h1" component="h1">
                    Frappy Time
                </Typography>
            </Box>
            <BalanceAdder className="BalanceAdder" />
        </Box>

    )
}