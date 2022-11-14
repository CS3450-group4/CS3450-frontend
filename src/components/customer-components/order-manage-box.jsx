import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderManageBox() {
  const [pickups, setPickups] = useState([])
  const [drinkHistory, setDrinkHistory] = useState([])
  const [allIngs, setAllIngs] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetchData();
    fetchIngs();
  }, [update])

  function fetchIngs() {
    fetch(`http://localhost:8000/api/ingredient/`, {

      method: 'GET',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          setAllIngs(data);
        }
      )
  }

  function fetchData() {
    fetch(`http://localhost:8000/api/orders/`, {

      method: 'GET',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          var custPickups = []
          var custHistory = []
          data.forEach(order => {
            if (order.user == window.localStorage.getItem('curUserID')) {
              if (order.orderStatus === "forPickup") {
                custPickups.push(order)
              }
              if (order.orderStatus === "pickuped") {
                custHistory.push(order)
              }
            }
          });
          setPickups(custPickups)
          setDrinkHistory(custHistory)
        }
      )
  }

  function pickUpOrder(order) {
    const pickupOrder = {
      price: order.price,
      user: order.user,
      orderStatus: "pickuped",
      ingredientList: order.ingredientList,
    }
    const changedPickups = pickups.filter(pickups => pickups.id !== order.id)
    setPickups(changedPickups)
    setUpdate(!update)
    try {
      fetch(`http://localhost:8000/api/orders/${order.id}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
        },
        'body': JSON.stringify(pickupOrder),
      })
    } catch (error) {
      console.log(error);
    }
  }

  function PickUpItems({ order }) {
    return (
      <Stack direction="row">
        {
          (order.length !== 0) ? (
            <Typography>{Object.keys(order.ingredientList)[0]}</Typography>
          ) : <Typography>No Pickups</Typography>
        }
      </Stack>
    )
  }
  function PickUps() {
    return (
      (pickups.length !== 0) ? (
        pickups.map((order, index) => {
          return (
            <Paper key={index}>
              <Typography>Price ${(order.price / 100).toFixed(2)}</Typography>
              <PickUpItems order={order}></PickUpItems>
              <Button onClick={() => { pickUpOrder(order) }} variant={"contained"}> Pick Up Order</Button>
            </Paper>
          )
        })
      ) : <Typography>No Pickups</Typography>
    )
  }
  function HistoryItem({ order }) {
    return (
      <Stack direction="row">
        {
          (order.length !== 0) ? (
            <Typography>{Object.keys(order.ingredientList)[0]}</Typography>
          ) : <Typography>No Pickups</Typography>
        }
      </Stack>
    )
  }

  function DrinkHistory() {
    return (
      (drinkHistory.length !== 0) ? (
        drinkHistory.map((order, index) => {
          return (
            <Paper key={index}>
              <Typography>Price ${(order.price / 100).toFixed(2)}</Typography>
              <HistoryItem order={order}></HistoryItem>
              <Button onClick={() => {
                getCustomerData(order)
              }
              } variant={"contained"}> Re Order</Button>
            </Paper>
          )
        })
      ) : <Typography>No Drink History</Typography>
    )
  }



  // ----------- STUFF NEEDED TO REORDER DRINKS ------------------- //
  function payManager(price) {
    var managerID = null;
    var managerUserData = null;
    fetch(`http://localhost:8000/api/user/all`, {
      method: 'GET',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    }).then((res) => res.json())
      .then((users) => {
        users.forEach(user => {
          if (user.userinfo.authLevel.includes(3)) {
            managerUserData = user;
            managerID = user.id
          }
        })
        if (managerID != null && managerUserData != null) {
          managerUserData.userinfo.balance += price
          try {
            fetch(`http://localhost:8000/api/user/${managerID}/`, {
              method: 'PUT',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + window.localStorage.getItem('token')
              },
              'body': JSON.stringify(managerUserData),
            })
          } catch (error) {
            console.log(error);
          }
        }
      })

  }

  function getCustomerData(order) {
    fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {

      method: 'GET',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          if (0 > data.userinfo.balance) alert("Balance Too Low for Order!");
          else {
            var ingredients = [];
            Object.values(order.ingredientList)[0].forEach(ingredient => {
              ingredients.push(ingredient)
            })
            if (checkStock(ingredients)) {
              data.userinfo.balance = data.userinfo.balance - (order.price)
              updateCustomerBalance(data);
              payManager(order.price)
              resumbitDrink(order)
            } else {
              alert("Sorry, we don't have enough ingredients in stock to resumbit your order :(")
            }
          }
        }
      )
  }
  function updateCustomerBalance(data) {
    try {
      fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
        },
        'body': JSON.stringify(data),
      })
    } catch (error) {
      console.log(error);
    }
  }

  function checkStock(ingredientList) {
    var inStock = true;
    var drinkIngNames = [];
    var drinkIngAmounts = [];
    ingredientList.forEach(ingredient => {
      drinkIngNames.push(ingredient.name)
      drinkIngAmounts.push(ingredient.options)
    })
    allIngs.forEach(ingredient => {
      var index = drinkIngNames.indexOf(ingredient.name)
      if (index != -1) {
        if ((drinkIngAmounts[index]) > ingredient.stock) {
          inStock = false;
        }
      }
    });
    return inStock;
  }
  function resumbitDrink(order) {
    const reOrdered = {
      price: order.price,
      user: order.user,
      orderStatus: "unfullfilled",
      ingredientList: order.ingredientList
    }
    const changedHistory = drinkHistory.filter(histOrder => histOrder.id !== order.id)
    setDrinkHistory(changedHistory)
    setUpdate(!update)
    try {
      fetch(`http://localhost:8000/api/orders/${order.id}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + window.localStorage.getItem('token')
        },
        'body': JSON.stringify(reOrdered),
      })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Stack spacing={2}>
      <Typography> Drinks Ready For Pickup </Typography>
      <Stack direction="row" spacing={2}>
        < PickUps />
      </Stack>
      <Divider />
      <Typography> Drinks You've Ordered In the Past </Typography>
      <Stack direction="row" spacing={2}>
        < DrinkHistory />
      </Stack>

    </Stack>

  )
}
