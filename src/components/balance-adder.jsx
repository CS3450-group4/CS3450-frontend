import {useState} from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
  } from "@mui/material";

export default function BalanceAdder(props) {
    const [balance, setBalance] = useState(0);
    const [isInvalidInput, setIsInvalidInput] = useState(false);

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
            alert(error)
        }
    }

    function submitBalance() {
        try {
            // TODO: API call to submit hours
        } catch (error) {
            
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