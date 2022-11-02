import {useState} from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
import user from "../tempObject"
export default function PayEmployees(props) {
    const [paymentPerHour, setPaymentPerHour] = useState(15);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [managerBalance, setManagerBalance] = useState(0);
    const [managerData, setManagerData] = useState(null);
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

    function getManagerBalance() {
        fetch(`http://localhost:8000/api/user/${user.id}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              setManagerBalance(data.balance);
              setManagerData(data);
              pay();
          }
        )
    }

    function updateManagerBalance() {
        managerData.balance = +managerBalance;
        try {
            fetch(`http://localhost:8000/api/user/${user.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(managerData),
              })
        } catch (error) {
            console.log(error);
        }
    }

    function handlePayment() {
        getManagerBalance();
    }

    function pay() {
        fetch(`http://localhost:8000/api/user/all`)
        .then((res) => res.json())
        .then(
          (employees) => {
            employees.forEach((employee) => {
                if (managerBalance -= employee.hoursWorked * +paymentPerHour > 0) {
                    employee.balance += employee.hoursWorked * +paymentPerHour;
                    setManagerBalance(managerBalance - (employee.hoursWorked * +paymentPerHour))
                    employee.hoursWorked = 0;
                    updateEmployee(employee);
                } else alert("Out of Money! Not all employees paid!!!");
            })
          }
        )
        updateManagerBalance();
    }

    function updateEmployee(employee) {
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
    }
    return (
        <Box className={props.className}>
            <Stack direction="column" spacing={1} alignItems="center" >
                <Typography variant="h5">Pay Employees</Typography>
                <Stack direction="row" spacing={1} alignItems="center" >
                    <TextField label="Hourly Rate" error={isInvalidInput} value={paymentPerHour} onChange={(newVal) => updatePaymentPerHour(newVal)}></TextField>
                    <Button onClick={() => handlePayment()}>Pay</Button>
                </Stack>
            </Stack>
        </Box>
    )
}