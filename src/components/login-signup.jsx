import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-signup.css";
import "./../App.css";
import {
    Box,
    Button,
    Card,
    TextField,
    Stack
  } from "@mui/material";
import TitleHeader from "./header";

export default function Login() {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    let navigate = useNavigate();
    const viewStrings = ["customer", "cashier", "barista", "manager"];

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function updateUserName(event) {
        setUserName(event.target.value);
    }

    function logIn() {
        // TODO: Verify user login
        navigate(viewStrings[2]);
    }

    function signUp() {
        // TODO: Verify user signup
        navigate(viewStrings[1]);
    }

    return (
        <div className="App">
            <Box className="TitleHeaderContainer">
                <TitleHeader />
            </Box>
            
            <Box class="container">
                <Card sx={{padding: '16px'}}>
                    <Stack direction="column" spacing={2}>
                        <TextField 
                            variant="standard" 
                            label="UserName" 
                            value={userName} 
                            onChange={updateUserName}
                        />
                        <TextField 
                            variant="standard" 
                            label="Password" 
                            value={password} 
                            onChange={updatePassword}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button variant="Contained" onClick={() => logIn()}>Login</Button>
                        <Button variant="Outlined" onClick={() => signUp()}>Sign Up</Button>
                    </Stack>
                </Card>
            </Box>
        </div>
    )
}