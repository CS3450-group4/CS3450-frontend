import {useState, useEffect, isFocused } from "react";
import {
    Box,
    MenuItem,
    FormControl,
    Select,
    InputLabel
  } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthSelector(props) {
    const [authLevels, setAuthLevels] = useState([]);
    const [selectedAuth, setSelectedAuth] = useState(null);
    const [userData, setUserData] = useState(null);
    const [optionArray, setOptionArray] = useState([]);

    let navigate = useNavigate();
    const location = useLocation();
    const viewStrings = ["../customer", "../cashier", "../barista", "../manager/options"];
    useEffect(() => {
        fetchData();
    }, [selectedAuth, location])

    function refreshPage() {
        window.location.reload(false);
    }

    function fetchData() {
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`,{

            method: 'GET',
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
    })
        .then((res) => res.json())
        .then(
          (data) => {
              setAuthLevels(data.userinfo.authLevel);
              setSelectedAuth(data.userinfo.actingLevel);
              setUserData(data);
              setOptionArray(authLevels.map(level => (
                <MenuItem value={level} key={level}>{level}</MenuItem>
              )))
          }
        )
    }

    function handleNewAuth (event) {
        setSelectedAuth(event.target.value);
        userData.userinfo.actingLevel = event.target.value;
        try {
            fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Token " + window.localStorage.getItem('token')
                },
                'body': JSON.stringify(userData),
              }).then(navigate(viewStrings[+event.target.value], {replace: true}))
              .then(() => fetchData(), refreshPage())
        } catch (error) {
            console.log(error);
        }
        fetchData();
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
