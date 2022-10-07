import { useState, useEffect } from "react";
import "./login-signup.css"
import {
    Box,
    Button,
    Card,
    TextField,
    Stack
  } from "@mui/material";

  export default function ViewTemplate() {
    useEffect(() => {
        fetch('http://localhost:8000/api/currentUser')
          .then((res) => res.json())
          .then((data) => setApiData(data))
    }, [])
  }