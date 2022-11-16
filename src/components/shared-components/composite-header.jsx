import {
    Typography,
    Box,
  } from "@mui/material";
import BalanceAdder from "./balance-adder";
import AuthSelector from "./auth-selector";
import SignOutBtn from './sign-out';
import "./composite-header.css"

export default function CompositeTitleHeader() {
    return (
        <Box className="TitleContainer">
            <AuthSelector className="button-2"/>
            <Box className="Title">
                <Typography variant="h1" component="h1">
                    Frappy Time
                </Typography>
            </Box>
            <BalanceAdder className="button-3" />
            <SignOutBtn className="button-1"/>
        </Box>

    )
}