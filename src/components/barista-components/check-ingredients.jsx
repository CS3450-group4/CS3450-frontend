import { useState, useEffect } from 'react'
import {
  Stack,
  Box,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  createTheme,
  ThemeProvider,
  positions,
} from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
export default function AddDrink(props) {
  const [orders, setorders] = useState([])
  const [isOrdersLoading, setOrdersLoading] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [currentDrink, setCurrentDrink] = useState(null)
  const [isGrabbed, setIsGrabbed] = useState([])
  const [disableMakeDrink, setDisableMakeDrink] = useState(true)
  const { palette } = createTheme();
  const theme = createTheme({
    palette: {
        mygrey: palette.augmentColor({
        color: {
            main: "#3A3A3A"
        }
        })
    }
    }); 
  useEffect(() => {
    fetchOrderData()
  }, [])

  function fetchOrderData() {
    setOrdersLoading(true)
    fetch('http://localhost:8000/api/orders/', {
      method: 'GET',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setOrdersLoading(false)
        const ordersQueue = []
        data.forEach((order) => {
          if (order.orderStatus === 'readyToFullfill') {
            ordersQueue.push(order)
          }
        })
        console.log(ordersQueue)
        if (ordersQueue.length == 0) return
        setorders(ordersQueue)
        setCurrentDrink(ordersQueue[0])
        buildButtons(ordersQueue[0])
      })
  }

  if (isOrdersLoading) {
    return <CircularProgress />
  }

  function checkIngrident(event, index, drink) {
    setIsGrabbed(() => {
      const previousState = isGrabbed
      previousState[index] = event.target.checked
      return previousState
    })
    event.target.disabled = true
    if (
      isGrabbed.length == Object.entries(drink.ingredientList)[0][1].length
    ) {
      setDisableMakeDrink(false)
    }
  }

  function buildButtons(drink) {
    setIsGrabbed([])
    setIngredients(
      Object.entries(drink.ingredientList)[0][1].map((ingrident, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={isGrabbed[index]}
              onChange={(newVal) => checkIngrident(newVal, index, drink)}
            />
          }
          label={ingrident.name}
        />
      )),
    )
  }

  async function buildDrink() {
    await fetch(`http://localhost:8000/api/fullfillorder/${currentDrink.id}/`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Authorization": "Token " + window.localStorage.getItem('token')
      },
    })

    currentDrink.orderStatus = 'forPickup'

    setorders((prevState) => {
      prevState.shift()
      return prevState
    })
    if (orders.length) {
      setCurrentDrink(orders[0])
    }
    else {
      setCurrentDrink(null)
      setIsGrabbed([])
      setIngredients([])
    }
    setDisableMakeDrink(true)
  }


  return (
    <Box
      sx={{marginTop: "5%",}}

    >
      <Stack>
        <FormControl className={props.ingredientClassName}>
          {ingredients}
        </FormControl>
        <ThemeProvider theme={theme}><Button color="mygrey" disabled={disableMakeDrink} onClick={() => buildDrink()}>
            Make Drink
          </Button>
        </ThemeProvider>
      </Stack>
    </Box>
  )
}
