import { Button, Typography, Box, Stack} from "@mui/material"
import { isJSDocReturnTag } from "typescript"

export default function CustomerCartBox({customerCart, setCart, setCustomerState}) {
    function removeDrink(drink) {
        const newCart = customerCart.filter(element => element !== drink)
        setCart(newCart)
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
            <Button onClick={() => {setCustomerState("menu")}}>RETURN TO MENU</Button>
        </Box>
    )

}