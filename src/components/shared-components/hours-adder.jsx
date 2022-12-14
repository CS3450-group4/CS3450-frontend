import {useEffect, useState} from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
export default function HoursAdder(props) {
    const [hours, setHours] = useState(0);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [totalHours, setTotalHours] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchHours();
    }, [])

    function fetchHours() {
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
        },
    })
        .then((res) => res.json())
        .then(
          (data) => {
              setTotalHours(data.userinfo.hoursWorked);
              setCurrentUser(data);
          }
        )
    }

    function updateHours(event) {
        try {
            setIsInvalidInput(false);
            const inputedData = Number(event.target.value);
            if (Number.isInteger(inputedData)) {
                setHours(event.target.value);
            } else {
                setIsInvalidInput(true)
                setHours(0);
            }
        } catch (error) {
            alert(error)
        }

    }

    function submitHours() {
        try {
            currentUser.userinfo.hoursWorked = +totalHours + +hours
            setHours(0);
            fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
                'body': JSON.stringify(currentUser),
              }).then(() => fetchHours())
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box className={props.className}>
            <Stack direction="row" spacing={1} alignItems="center" >
                <Typography variant="h6">Hours Worked: {totalHours}</Typography>
                <TextField label="Add Hours" error={isInvalidInput} value={hours} onChange={(newVal) => updateHours(newVal)}></TextField>
                <Button onClick={() => submitHours()}>Submit</Button>
            </Stack>
        </Box>
    )
}
