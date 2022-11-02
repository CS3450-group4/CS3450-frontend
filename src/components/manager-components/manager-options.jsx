import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Paper
  } from "@mui/material";
import user from "../tempObject"
import "./manager-main.css"
import { Route, useNavigate } from "react-router-dom";
export default function ManagerOptions(props) {
    let navigation = useNavigate()
    return(
        <Box className={props.className}>
            <Stack spacing={4}>
                <Paper elevation={3}>
                    <Button onClick={() => {navigation("../change-auth", {replace: true})}}>Change User Auth Levels</Button>
                </Paper>
                <Paper elevation={3}>
                    <Button onClick={() => {navigation("../buy-ingredients", {replace: true})}}>Purchase Ingredients</Button>
                </Paper>
                <Paper elevation={3}>
                    <Button onClick={() => {navigation("../add-ingrident", {replace: true})}}>Add New Ingrident</Button>
                </Paper>
                <Paper elevation={3}>
                    <Button onClick={() => {navigation("../create-drink", {replace: true})}}>Add New Drink</Button>
                </Paper>
                <Paper elevation={3}>
                    <Button onClick={() => {navigation("../remove-drink", {replace: true})}}>Remove Drink</Button>
                </Paper>
            </Stack>
        </Box>
    )
}