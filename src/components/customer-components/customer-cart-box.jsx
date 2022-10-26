import { Button, Typography, Box, Stack} from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function CustomerCartBox({customerCart, setCart, setFrapOrder}) {
    let navigation = useNavigate()

    function removeDrink(drink) {
        const newCart = customerCart.filter(element => element !== drink)
        setCart(newCart)
    }

    function sendToCashier() {
        console.log("sent cart to cashier", customerCart)
        // check users balance
        // add order to the ORDERS model
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