import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
  } from "@mui/material";
export default function BalanceAdder(props) {
    const [balance, setBalance] = useState(0);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`,{

            method: 'GET',
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
        })
        .then((res) => res.json())
        .then(
          (data) => {
              setBalance(data.userinfo.balance);
              setCurrentUser(data)
          }
        )
    }

    function updateBalance(event) {
        try {
            setIsInvalidInput(false);
            const inputedData = Number(event.target.value);
            if (Number.isInteger(inputedData)) {
                setBalance(event.target.value);
            } else {
                setIsInvalidInput(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function submitBalance() {
        try {
            currentUser.userinfo.balance = balance;
            setBalance(0);
            fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
                'body': JSON.stringify(currentUser),
              }).then(() => fetchData())
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box className={props.className}>
            <Stack direction="row" spacing={1} alignItems="center" >
                <TextField label="Balance" error={isInvalidInput} value={balance} onChange={(newVal) => updateBalance(newVal)}></TextField>
                <Button onClick={() => submitBalance()}>Save</Button>
            </Stack>
        </Box>
    )
}
