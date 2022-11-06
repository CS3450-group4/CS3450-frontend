import {useState, useEffect} from "react";
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
    let managerBalance = 0;
    const [managerData, setManagerData] = useState(null);
    const [employees, setEmployees] = useState(null);

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
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              managerBalance = data.userinfo.balance;
              setManagerData(data);
              pay();
          }
        )
        
    }

    function updateManagerBalance() {
        managerData.userinfo.balance = managerBalance;
        try {
            fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
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

    async function pay() {
        fetch(`http://localhost:8000/api/user/all`)
        .then((res) => res.json())
        .then(
          (data) => {
            setEmployees(data);
            console.log(employees);
            handlePay();
          }
        )
    }

    function handlePay() {
        let allPaid = true
        employees.forEach((employee) => {
            //console.log(employee.userinfo.hoursWorked);
            if (managerBalance - (employee.userinfo.hoursWorked * +paymentPerHour) > 0) {
                employee.userinfo.balance += employee.userinfo.hoursWorked * +paymentPerHour;
                employee.userinfo.hoursWorked = 0;
                managerBalance -= (employee.userinfo.hoursWorked * +paymentPerHour);
            } else{
                console.log("oh")
                allPaid = false
            } 
        })
        employees.forEach((employee) => {
            updateEmployee(employee);
        })
        updateManagerBalance();
        if (!allPaid) alert("Not All Employees Paid! Out of Money!")
    }

    function updateEmployee(employee) {
        try {
            fetch(`http://localhost:8000/api/user/${employee.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(employee.userinfo),
              }).then((res) => res.json())
              .then(
                (data) => {
                    console.log("finished updating hours/balance")
                    console.log(data)
                }
              )
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
                    <Button onClick={() => getManagerBalance()}>Pay</Button>
                </Stack>
            </Stack>
        </Box>
    )
}