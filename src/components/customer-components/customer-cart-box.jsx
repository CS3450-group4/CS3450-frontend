import { Button, Typography, Box, Stack} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import user from "../tempObject"
export default function CustomerCartBox({customerCart, setCart, setFrapOrder}) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [update, forceUpdate] = useState(true)
    const [customerData, setCustomerData] = useState(null)

    let navigation = useNavigate()
    useEffect(() => {
        changeTotalPrice()
        getCustomerData()
    }, [update])

    function rerender() {
        forceUpdate(!update)
    }

    function updateCustomerBalance(newBalance) {
        customerData.balance = newBalance;
        console.log(newBalance)
        try {
            fetch(`http://localhost:8000/api/user/${user.id}/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                'body': JSON.stringify(customerData),
              })
        } catch (error) {
            console.log(error);
        }
    }

    function getCustomerData() {
        fetch(`http://localhost:8000/api/user/${user.id}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              setCustomerData(data);
              rerender()
          }
        )
    }

    function changeTotalPrice() {
        var tempPrice = 0
        customerCart.forEach(drink => {
            tempPrice += drink.price
        })
        setTotalPrice(tempPrice)
    }

    function removeDrink(drink) {
        const newCart = customerCart.filter(element => element !== drink)
        setCart(newCart)
        rerender(!update)
    }

    function sendToCashier() {
        if (customerData.balance < 0) alert("Balance Too Low for Order!");
            //   else if (ingridentName == "" || amountOptions == null) alert("Missing Fields!");
        else {
            updateCustomerBalance(customerData.balance - totalPrice)
            var orderDrinks = {}
            customerCart.forEach(drink => {
                orderDrinks[drink.name] = drink.ingredients
            })
            const customerOrder = {
                price: totalPrice,
                user: 1,
                orderStatus: "unfullfilled",
                ingredientList: orderDrinks,
            }
            if (customerCart.length !== 0) {
                try {
                    fetch(`http://localhost:8000/api/orders/`, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        'body': JSON.stringify(customerOrder),
                      })
                } catch (error) {
                    console.log(error);
                }
            }
            setCart([])
    }
    }

    function sizeConv(size) {
        if(size === 2) {
            return("Medium")
        } else if (size === 3) {
            return("Large")
        } else {
            return("Small")
        }
    }

    function OrderItem({drink}) {
        return(
            <Stack direction="row" justifyContent="center"
            alignItems="center">
                <Typography>{sizeConv(drink.size)} {drink.name}: ${(drink.price/100).toFixed(2)}</Typography>
                {/* <Button
                    onClick={() => {
                        setFrapOrder(drink)
                        navigation("../drink", {replace: true});}}
                >Edit</Button> */}
                <Button onClick={() => {
                    removeDrink(drink)
                }}>X</Button>
            </Stack>
        )
    }

    return(
        <Box>
            <Typography>Total Price: ${(totalPrice/100).toFixed(2)}</Typography>
            {customerCart.map((drink, index) => 
                <OrderItem drink={drink} key={index}></OrderItem>
            )}
            <Stack direction={"row"}>
                <Button variant="contained" onClick={() => {sendToCashier()}}>SUMBIT ORDER</Button>
                <Button variant="contained" onClick={() => {navigation("../menu", {replace: true})}}>RETURN TO MENU</Button>
            </Stack>
            
        </Box>
    )

}