import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
  } from "@mui/material";
import user from "./tempObject"
export default function BalanceAdder(props) {
    const [balance, setBalance] = useState(0);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/user/${user.id}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              setBalance(data.balance);
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
            currentUser.balance = balance;
            fetch(`http://localhost:8000/api/user/${user.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(currentUser),
              })
        } catch (error) {
            console.log(error);
        }
        fetchData();
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