import { useState } from "react";
import {
  Stack,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
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

  const payemployees = () => {
    const data = { "payrate": Number(paymentPerHour) }
    const managerInfo = fetch("http://localhost:8000/api/payemployees/",
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
        },
        'body': JSON.stringify(data)
      }).then((res) => res.json())
      .catch((_) => {
        return (
          <Alert severity="error">Error paying employees</Alert>
        )
      })

    return managerInfo
  }

  return (
    <Box className={props.className}>
      <Stack direction="column" spacing={1} alignItems="center" >
        <Typography variant="h5">Pay Employees</Typography>
        <Stack direction="row" spacing={1} alignItems="center" >
          <TextField label="Hourly Rate" error={isInvalidInput} value={paymentPerHour} onChange={(newVal) => updatePaymentPerHour(newVal)}></TextField>
          <Button onClick={payemployees}>Pay</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
