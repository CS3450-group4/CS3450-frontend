import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
  } from "@mui/material";
import BackBtn from "../shared-components/back-btn";
export default function ChangeAuth(props) {
    const [inputtedEmail, setInputtedEmail] = useState("");
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [user, setUser] = useState(null);
    const [isBarista, setIsBarista] = useState(false);
    const [isCashier, setIsCashier] = useState(false);


    function handleBaristaChange(event) {
        setIsBarista(event.target.checked)
    }

    function handleCashierChange(event) {
        setIsCashier(event.target.checked)
    }

    function updateEmail(event) {
        setIsInvalidInput(false)
        setInputtedEmail(event.target.value)
    }

    function updateAuthLevels() {
        if (user == null) return;
        user.userinfo.authLevel = [0]
        if (isCashier) user.userinfo.authLevel.push(1)
        if (isBarista) user.userinfo.authLevel.push(2)
        try {
            fetch(`http://localhost:8000/api/user/${user.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
                'body': JSON.stringify(user),
              })
              .then((res) => {
                setInputtedEmail("");
                setIsBarista(false);
                setIsCashier(false);
                setUser(null)
              })
        } catch (error) {
            console.log(error);
        }
    }

    function removeUser() {
        try {
            fetch(`http://localhost:8000/api/user/${user.id}/`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
              })
            .then((res) => {
                setInputtedEmail("");
                setIsBarista(false);
                setIsCashier(false);
                setUser(null)
            })
        } catch (error) {
            console.log(error);
        }
    }

    function searchForUser() {
        fetch(`http://localhost:8000/api/userName/${inputtedEmail}/`,{

            method: 'GET',
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
    })
        .then((res) => res.json())
        .then(
            (data) => {
                if (data.userinfo.authLevel.includes(3)){
                    setIsInvalidInput(true);
                    return;
                } 
                setUser(data);
                if (data.userinfo.authLevel.includes(2)) {
                    setIsBarista(true);
                }
                if (data.userinfo.authLevel.includes(1)) {
                    setIsCashier(true);
                }
        })
        .catch(
            (e) => {
                console.log(e);
                setIsInvalidInput(true);
            }
        )

    }

    return (
        <Box className={props.className}>
            <BackBtn className="BackBtnContainer" endPoint="../options"/>
            <Stack direction="row">
                <TextField label="Email" error={isInvalidInput} value={inputtedEmail} onChange={(newVal) => updateEmail(newVal)}></TextField>
                <Button onClick={() => searchForUser()}>Search</Button>
            </Stack>
            <FormGroup>
                <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Customer" />
                <FormControlLabel control={<Checkbox  checked={isCashier} onChange={(newVal) => handleCashierChange(newVal)}/>} label={<Typography color={'black'}>Cashier</Typography>} />
                <FormControlLabel control={<Checkbox checked={isBarista} onChange={(newVal) => handleBaristaChange(newVal)}/>} label={<Typography color={'black'}>Barista</Typography>} />
            </FormGroup>
            <Stack direction="column" spacing={3}>
                <Button disabled={user == null} onClick={updateAuthLevels}>Update</Button>
                <Button disabled={user == null} onClick={removeUser}>Remove User</Button>
            </Stack>
            
        </Box>
    )
}
