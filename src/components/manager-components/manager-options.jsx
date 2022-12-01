import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    Button,
    Paper
  } from "@mui/material";
import { Route, useNavigate } from "react-router-dom";
export default function ManagerOptions(props) {
    let navigation = useNavigate()
    return(
        <Box className={props.className}>
            <Stack spacing={4}>
                <button className="button-5" onClick={() => {navigation("../change-auth", {replace: true})}}>Change User Auth Levels</button>
                <button className="button-5" onClick={() => {navigation("../buy-ingredients", {replace: true})}}>Purchase Ingredients</button>
                <button className="button-5" onClick={() => {navigation("../add-ingrident", {replace: true})}}>Add New Ingrident</button>
                <button className="button-5" onClick={() => {navigation("../create-drink", {replace: true})}}>Add New Drink</button>
                <button className="button-5"  onClick={() => {navigation("../remove-drink", {replace: true})}}>Remove Drink</button>
            </Stack>
        </Box>
    )
}