import { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthSelector(props) {
  const [selectedAuth, setSelectedAuth] = useState(0);
  const [userData, setUserData] = useState();

  let navigate = useNavigate();
  const viewStrings = ["../customer", "../cashier", "../barista", "../manager/options"];

  // fetch userData onMount only
  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {

      method: 'GET',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          setSelectedAuth(data.userinfo.actingLevel);
          setUserData(data);
        }
      )
      .catch((err) => <Alert severity="error">{err}</Alert>)
  }

  // Because of the way useEffect works, fetchData will never be ran
  // until the component is fully rendered. The following conditional
  // will cause the component to only render a loading circle until
  // useEffect has ran.
  if (!userData) {
    return <CircularProgress />
  }

  async function handleNewAuth(event) {
    setSelectedAuth(event.target.value);
    userData.userinfo.actingLevel = event.target.value;
    const freshUserData = await fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
        return data
      })
      .catch((err) => console.log(err))
    navigate(viewStrings[+event.target.value], { replace: true })
    setSelectedAuth(freshUserData.userinfo.actingLevel)
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
          {userData.userinfo.authLevel.map((level) =>
            <MenuItem value={level} key={level}>{level}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  )
}
