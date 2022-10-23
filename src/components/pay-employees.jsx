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
                console.log("EO");
                setPaymentPerHour(event.target.value);
            } else {
                setIsInvalidInput(true)
            }
        } catch (error) {
            alert(error)
        }
    }

    function pay() {
        fetch(`http://localhost:8000/api/user/all`)
        .then((res) => res.json())
        .then(
          (employees) => {
            console.log(employees);
            employees.forEach((employee) => {
                employee.balance += employee.hoursWorked * paymentPerHour;
                employee.hoursWorked = 0;
                try {
                    fetch(`http://localhost:8000/api/user/${employee.id}/`, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        'body': JSON.stringify(employee),
                      })
                } catch (error) {
                    console.log(error);
                }
            })
          }
        )
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