import React, { useState } from 'react'
import {
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';

const SignupForm = ({ onClose }) => {
  //set state 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const updateInputValue = (event, setter, errorSetter) => {
    setter(event.target.value);
    errorSetter(false);
  }
  const submit = () => {
    var missingInfo = false;
    if (username == "") {
      setIsUserNameError(true);
      missingInfo = true;
    }
    if (password == "") {
      setIsPasswordError(true);
      missingInfo = true;
    }
    if (firstName == "") {
      setIsFirstNameError(true);
      missingInfo = true;
    }
    if (lastName == "") {
      setIsLastNameError(true);
      missingInfo = true;
    }
    if (email == "") {
      setIsEmailError(true)
      missingInfo = true;
    }
    if (missingInfo) return;
    fetch('http://localhost:8000/api/create_user/', {

      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        "username": username,
        "first_name": firstName,
        "last_name": lastName,
        "password": password,
        "userinfo": {
          "authLevel": [
            0
          ],
          "balance": 0,
          "actingLevel": 0,
          "hoursWorked": 0
        }
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))
    onClose()
  }
  return (
    <Card sx={style}>
      <Box>Signup</Box>
      <CardContent sx={{
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='username'
              value={username}
              error={isUserNameError}
              onChange={(event) => updateInputValue(event, setUsername, setIsUserNameError)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='password'
              value={password}
              error={isPasswordError}
              onChange={(event) => updateInputValue(event, setPassword, setIsPasswordError)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='first name'
              value={firstName}
              error={isFirstNameError}
              onChange={(event) => updateInputValue(event, setFirstName, setIsFirstNameError)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='last name'
              value={lastName}
              error={isLastNameError}
              onChange={(event) => updateInputValue(event, setLastName, setIsLastNameError)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='email'
              value={email}
              error={isEmailError}
              onChange={(event) => updateInputValue(event, setEmail, setIsEmailError)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              onClick={submit}>Submit</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}


export default SignupForm;
