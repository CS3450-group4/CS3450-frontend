import {
    Box,
    Button,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  export default function BackBtn(props) {
    let navigate = useNavigate()
    function backOut() {
        navigate(props.endPoint, {replace: true})
    }

    return (
        <Box className={props.className}>
            <Button onClick={() => backOut()} size="large" variant="contained">
                Back
            </Button>
        </Box>
    )
}