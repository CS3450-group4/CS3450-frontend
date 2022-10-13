import { Button, Typography, Box } from "@mui/material"

export default function OrderBox({stateChanger, state}){
    return(
        <Box>
            <Typography> ORDER SCREEN</Typography>
            <Button onClick={() => stateChanger(!state)}> Cancel Order </Button>
        </Box> 
    )
}