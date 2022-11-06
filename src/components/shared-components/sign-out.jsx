import {
    Box,
    Button,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  export default function SignOutBtn(props) {
    let navigate = useNavigate()

    function logg() {
        // Implement. Should be code below but broke.
        // fetch('http://localhost:8000/api/logout/', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     credentials: 'include'
        //   }).then((res) => res.json())
        //     .then((data) => {
        //       navigate("/", {replace: true});
        //     })
        //     .catch((err) => console.log(err))
    }
    


    return (
        <Box className={props.className}>
            <Button onClick={logg}>
                LogOut
            </Button>
        </Box>
    )
  }
