import {useState} from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
export default function PayEmployees(props) {
    const [paymentPerHour, setPaymentPerHour] = useState(15);
    const [isInvalidInput, setIsInvalidInput] = useState(false);

    function updatePaymentPerHour(event) {
        try {
            setIsInvalidInput(false);
            const inputedData = Number(event.target.value);
            if (Number.isInteger(inputedData)) {
                setPaymentPerHour(event.target.value);
            } else {
                setIsInvalidInput(true)
            }
        } catch (error) {
            alert(error)
        }
    }

    function pay() {
        // TODO: Implement
    }
    return (
        <Box className={props.className}>
            <Stack direction="column" spacing={1} alignItems="center" >
                <Typography variant="h5">Pay Employees</Typography>
                <Stack direction="row" spacing={1} alignItems="center" >
                    <TextField label="Hourly Rate" error={isInvalidInput} value={paymentPerHour} onChange={(newVal) => updatePaymentPerHour(newVal)}></TextField>
                    <Button onClick={() => pay()}>Pay</Button>
                </Stack>
            </Stack>
        </Box>
    )
}