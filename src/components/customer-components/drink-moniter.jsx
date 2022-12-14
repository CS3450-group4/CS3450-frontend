import { Button, Stack} from "@mui/material";

export default function DrinkMoniter({setScreen, screen}) {

    function NavButton() {
        if(screen === "order-manage") {
            return (
                <Button class = 'button' onClick={() => {setScreen("menu")}} variant={"contained"}>Menu</Button>
            )
        } else {
            return(
                <Button class = 'button' onClick={() => {setScreen("order-manage")}} variant={"contained"}>Order Manage</Button>
            )
        }
    }

    return(
        <Stack direction="row" spacing={2}>
            <NavButton></NavButton>
        </Stack>
        
    )
    
}