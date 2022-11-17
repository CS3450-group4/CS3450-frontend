import { Box, Button, Stack, Typography } from "@mui/material";
import {useState, useEffect } from "react";

export default function RunAllTests(props) {
  const [resultString, setResultString] = useState("");
  var passedCount = 10;

  async function updateResultString() {
    setResultString("PASSED: " + passedCount + "/10 -- Check Console For Details")
  }

  async function startTesting() {
    setResultString("");
    console.log("--- Running Tests ---")
    console.log("Creating Ingredients...")
    await createIngredient()

  }

  async function createIngredient() {
    const newIngrident = {
      name: "tttt",
      stock: 23,
      retailCost: 10,
      wholeSaleCost: 3,
      isMilk: false,
      options: 1
    }
    fetch(`http://localhost:8000/api/ingredient/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(newIngrident),
    })
    .then((res) => {
      if (!res.ok) passedCount -= 1;
      return res.json();
    })
    .then(() => {
      console.log("Creating Drink...");
      createDrink()
    })
    
  }

  async function createDrink() {
    const newDrink = {
      name: "TestDrink11",
      price: 23,
      ingredientList: [],
    }
    fetch(`http://localhost:8000/api/menu/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(newDrink),
    })
    .then((res) => {
      if (!res.ok) passedCount -= 1;
      return res.json();
    })
    .then((data) => {
      console.log("Removing Drink...")
      removeDrink(data)
    })
  }

  async function removeDrink(drink) {
    fetch(`http://localhost:8000/api/menu/${drink.name}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
    .then((res) => {
      if (!res.ok) passedCount -= 1;
      return res.json();
    })
    .then(() => {
      console.log("Creating User...");
      createUser();
    })
  }

  async function createUser() {
    fetch('http://localhost:8000/api/create_user/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        "username": "TEST12",
        "first_name": "TEST12",
        "last_name": "TEST12",
        "password": "TEST12",
        "userinfo": {
          "authLevel": [
            0, 1
          ],
          "balance": 0,
          "actingLevel": 0,
          "hoursWorked": 0
        }
      }),
    }).then((res) => {
      if (!res.ok) passedCount -= 1;
      return res.json()
    })
    .then((data) => {
      console.log("Removing User...");
      removeUser(data.id);
    })
  }

  async function removeUser(id) {
    fetch(`http://localhost:8000/api/user/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
    .then((res) => {
      if (!res.ok) passedCount -= 1;
      return res.json()
    })
    .then(() => {
      console.log("Fetching User...")
      fetchUser();
    })
  }

  async function fetchUser() {
    fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`,{

      method: 'GET',
      headers: {
          "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
    .then((res) =>{
     if (!res.ok) passedCount -= 1;
     return res.json()
    })
    .then(
      (data) => {
        console.log("Updating Hours Worked...");
        updateHoursWorked(data);
      }
    )
  }

  async function updateHoursWorked(user) {
    user.userinfo.hoursWorked = 10;
    fetch(`http://localhost:8000/api/user/${user.id}/`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(user),
    })
    .then((res) => {
      if (!res.ok) passedCount -= 1;
      return res.json()
    })
    .then((data) => {
      console.log("Changing User Balance...");
      changeBalance(data);
    })
  }

  async function changeBalance(user) {
    user.userinfo.balance = 400;
    fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(user),
    })
    .then((data) => {
      if (!data.ok) passedCount -= 1;
      return data.json();
    })
    .then(() => {
      console.log("Enforcing Acting Level to Customer (0)...");
      changeActingAuth(user);
    })
  }

  async function changeActingAuth(user) {
    user.userinfo.actingLevel = 0;
    fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(user),
    })
    .then((data) => {
      if (!data.ok) passedCount -= 1;
      return data.json();
    })
    .then(() => {
      console.log("Placing Order...");
      placeOrder();
    })
  }

  async function placeOrder() {
    var orderDrinks = {}
    orderDrinks["TEST DRINK"] = []
    const customerOrder = {
      price: 700,
      user: window.localStorage.getItem('curUserID'),
      orderStatus: "unfullfilled",
      ingredientList: orderDrinks,
    }
    fetch(`http://localhost:8000/api/orders/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
      },
      'body': JSON.stringify(customerOrder),
    })
    .then((data) => {
      if (!data.ok) passedCount -= 1;
      updateResultString();
    })
  }

  return (
    <Box className={props.className}>
      <Stack style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button variant="contained" style={{width: '10em'}} onClick={() => startTesting()}>Run Tests</Button>
        <Typography style={{color: 'black'}}>{resultString}</Typography>
      </Stack>
    </Box>
  )
}


