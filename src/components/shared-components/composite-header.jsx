import {
    Typography,
    Box,
  } from "@mui/material";
import BalanceAdder from "./balance-adder";
import AuthSelector from "./auth-selector";
import SignOutBtn from './sign-out';
import "./composite-header.css"
import { Stack } from "@mui/system";

export default function CompositeTitleHeader() {
    return (
        <Box className="TitleContainer">
            <Stack direction={"row"} className="HeaderStack" spacing={2}>
                <Stack direction={"row"} className="HeaderLeft">
                    <AuthSelector className="button-2"/>
                </Stack>
                <Stack direction={"row"} className="HeaderCenter">
                    <Box className="Title">
                        <Typography variant="h1" component="h1">
                            Frappy Time
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={"row"} className="HeaderRight">
                    <BalanceAdder className="button-3" />
                    <SignOutBtn className="button-1"/>
                </Stack>
            </Stack>
        </Box>
    )
}