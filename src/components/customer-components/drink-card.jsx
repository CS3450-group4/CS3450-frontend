import {useState} from "react";
import {
    Stack,
    Card,
    TextField,
    Button,
    Typography,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader,
  } from "@mui/material";
import "./drink-card.css"

const styles = muiBaseTheme => ({ 
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
          }
    },
    media: {
      paddingTop: "56.25%"
    },
})

  

  export default function DrinkCard({menuitem, state, stateChanger, setFrapOrder}, classes) {

    function DrinkIngredients(ingredientList) {
        var ingredientString = "This drink conatains "
        for (let x in ingredientList) {
            if (x == ingredientList.length-1) {
                ingredientString += ` and ${ingredientList[x].name}`
            } else {
                ingredientString += `${ingredientList[x].name}, `
            }
        }
        return (
            ingredientString
        )
    }

    return (
        <Card className={"DrinkCard"} variant="outlined">
            <CardHeader
                title={menuitem.name}
                subheader={`Price: ${menuitem.price}`}
            />
            <CardMedia
            className="DrinkCardMedia"
            component="img"
            image={require('./frap1.jpg')}
            alt="Frappichino"
            
            />
            <CardContent>
                <Typography variant="caption">
                    {DrinkIngredients(menuitem.ingredientList)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={() => {stateChanger(!state); setFrapOrder(menuitem)}}>Order</Button>
            </CardActions>
            
        </Card>
    )
  }