import {useState} from "react";
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
            // TODO: API call to submit hours
        } catch (error) {
            
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