import {
    Box,
    Button,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  export default function SignOutBtn(props) {
    let navigate = useNavigate()

    function logg() {
        navigate("/", {replace: true});
    }
    


    return (
        <Box className={props.className}>
            <Button onClick={logg}>
                LogOut
            </Button>
        </Box>
    )
}
