import { Box, Button, Divider, List, ListItem, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";

const milkIng = {
    name: "test milk ingredient",
    stock: 35,
    retailCost: 15,
    wholeSaleCost: 10,
    isMilk: true,
    options: 1
}
const otherIng = {
    name: "test non milk ingredient",
    stock: 35,
    retailCost: 15,
    wholeSaleCost: 10,
    isMilk: false,
    options: 1
}
const orderedItem = {
    name: "Frappichino",
    price: 11,
    size: 1,
    ingredientList: [milkIng, otherIng]
}

function SizeAsString({intSize}) {
    if (intSize == 1) {
        return <ListItemText>Small</ListItemText>
    } else if (intSize == 2) {
        return <ListItemText>Medium</ListItemText>
    } else {
        return <ListItemText>Large</ListItemText>
    }
}

const ingredients = orderedItem.ingredientList.map((ingredient, index) => 
        <ListItem>
            <ListItemText>{ingredient.name}: {ingredient.options}</ListItemText>
        </ListItem>
    );

function sendToBarista() {
    // TODO add order to the barista's queue
}

export default function OrdersBox() {
    return(
        <Box>
            <Stack style={{backgroundColor: 'white'}} direction="row">
            <Stack >
            <List>
                <ListItem>
                    <ListItemText>{orderedItem.name}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Price {orderedItem.price}</ListItemText>
                </ListItem>
                <ListItem>
                    <SizeAsString intSize={orderedItem.size}></SizeAsString>
                </ListItem>
            </List>
            </Stack>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Stack>
                <List>
                    <ListSubheader>Ingredients</ListSubheader>
                    {ingredients}
                </List>
            </Stack>
            </Stack>
            <Button onClick={ () => sendToBarista()}>Send to Barista</Button>
        </Box>
    );
}