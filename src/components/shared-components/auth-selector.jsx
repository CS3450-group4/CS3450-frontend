import {useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel
  } from "@mui/material";
import user from "../tempObject"
import { useNavigate } from "react-router-dom";
export default function AuthSelector(props) {
    const [authLevels, setAuthLevels] = useState([]);
    const [selectedAuth, setSelectedAuth] = useState(null);
    const [userData, setUserData] = useState(null);
    const [optionArray, setOptionArray] = useState([]);
    const [updated, setUpdated] = useState(false);
    let navigate = useNavigate();
    const viewStrings = ["../customer", "../cashier", "../barista", "manager"];

    useEffect(() => {
        fetchData();
    }, [selectedAuth])

    function fetchData() {
        fetch(`http://localhost:8000/api/user/${user.id}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              setAuthLevels(data.authLevel);
              setSelectedAuth(data.actingLevel);
              setUserData(data);
              setOptionArray(authLevels.map(level => (
                <MenuItem value={level} key={level}>{level}</MenuItem>
              )))
          }
        )
    }

    function handleNewAuth (event) {
        setSelectedAuth(event.target.value);
        userData.actingLevel = event.target.value;
        try {
            fetch(`http://localhost:8000/api/user/${user.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(userData),
              })
        } catch (error) {
            console.log(error);
        }
        navigate(viewStrings[+event.target.value], {replace: true}).then(() => fetchData)
    }

    return (
        <Box className={props.className}>
            <FormControl fullWidth>
                <InputLabel id="select-auth-label">Auth</InputLabel>
                <Select
                    labelId="select-auth-label"
                    id="select-auth"
                    value={selectedAuth}
                    label="Auth"
                    onChange={handleNewAuth}

                >
                    {optionArray}
                </Select>
            </FormControl>
        </Box>
    )
}