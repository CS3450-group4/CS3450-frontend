import {useEffect, useState} from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
import user from "../tempObject"
export default function HoursAdder(props) {
    const [hours, setHours] = useState(0);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [totalHours, setTotalHours] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchHours();
    }, [])

    function fetchHours() {
        fetch(`http://localhost:8000/api/user/${user.id}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              setTotalHours(data.hoursWorked);
              setCurrentUser(data);
              console.log(data);
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
            currentUser.hoursWorked = +totalHours + +hours
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
        fetchHours();
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