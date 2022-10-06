import { useState } from "react";
import "./login-signup.css"
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

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function updateUserName(event) {
        setUserName(event.target.value);
    }

    function logIn() {
        alert(userName)
    }

    function signUp() {
        alert(password)
    }

    return (
        <div>
            <TitleHeader />
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