import { Button, Typography, Box, Stack} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CustomerCartBox() {
    const [totalPrice, setTotalPrice] = useState(0)
    var customerCart;
    if (window.localStorage.getItem('customerCart') == null || window.localStorage.getItem('customerCart') == []) {
        customerCart = [];
    } else {
        customerCart = JSON.parse(window.localStorage.getItem('customerCart'));
    }
    const [update, forceUpdate] = useState(true)

    let navigation = useNavigate()
    useEffect(() => {
        changeTotalPrice()
    }, [update])

    function rerender() {
        forceUpdate(!update)
    }

    function getCustomerData() {
        fetch(`http://localhost:8000/api/user/${window.localStorage.getItem('curUserID')}/`)
        .then((res) => res.json())
        .then(
          (data) => {
              if (0 > data.userinfo.balance ) alert("Balance Too Low for Order!");
              else {
                data.userinfo.balance = data.userinfo.balance - (+totalPrice)
                updateCustomerBalance(data);
                sendToCashier()
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
                },
                'body': JSON.stringify(data),
              })
        } catch (error) {
            console.log(error);
        }
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
        window.localStorage.setItem('customerCart', JSON.stringify(newCart))
        rerender(!update)
    }

    function sendToCashier() {
        var orderDrinks = {}
        customerCart.forEach(drink => {
            orderDrinks[drink.name] = drink.ingredients
        })
        const customerOrder = {
            price: totalPrice,
            user: window.localStorage.getItem('curUserID'),
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
            window.localStorage.setItem('customerCart', JSON.stringify([]))
            rerender()
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
                <Button variant="contained" onClick={() => {getCustomerData()}}>SUMBIT ORDER</Button>
                <Button variant="contained" onClick={() => {navigation("../menu", {replace: true})}}>RETURN TO MENU</Button>
            </Stack>
            
        </Box>
    )

}