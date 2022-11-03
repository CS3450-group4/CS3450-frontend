import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-signup.css";
import "./../App.css";
import {
  Box,
  Button,
  Card,
  TextField,
  Stack,
  Modal
} from "@mui/material";
import TitleHeader from "./header";
import SignupForm from "./signup-form";

export default function Login() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isModalOpen, setModalState] = useState(false);
  let navigate = useNavigate();
  const viewStrings = ["customer", "cashier", "barista", "manager"];

  const handleOpenModal = () => {
    setModalState(true)
  }
  const handleCloseModal = () => {
    setModalState(false)
  }
  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateUserName(event) {
    setUserName(event.target.value);
  }


  async function logIn() {

    const userData = await fetch('http://localhost:8000/api/login/', {

      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        username: userName,
        password: password
      }),
      credentials: 'include'
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((err) => console.log(err))
    console.log(userData)
    return userData
  }

  function signUp() {
    setModalState(true);
  }

  return (
    <div className="App">
      <Box className="TitleHeaderContainer">
        <TitleHeader />
      </Box>

      <Box class="container">
        <Card sx={{ padding: '16px' }}>
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
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <SignupForm onClose={handleCloseModal} />
      </Modal>

    </div>
  )
}
