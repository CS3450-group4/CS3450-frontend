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

  

  export default function DrinkCard(props, classes) {

    function DrinkIngredients(ingredientList) {
        var ingredientString = "This drink conatains "
        for (let x in ingredientList) {
            if (x == ingredientList.length-1) {
                ingredientString += ` and ${ingredientList[x]}`
            } else {
                ingredientString += `${ingredientList[x]}, `
            }
        }
        return (
            ingredientString
        )
    }

    return (
        <Card className={classes.card} variant="outlined">
            <CardHeader
                title={props.menuitem.name}
                subheader={`Price: ${props.menuitem.price}`}
            />
            <CardMedia
            className="DrinkCardMedia"
            component="img"
            image={require('./frap1.jpg')}
            alt="Frappichino"
            
            />
            <CardContent>
                <Typography variant="caption">
                    {DrinkIngredients(props.menuitem.ingredientList)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={() => {console.log("ORDERED")}}>Order</Button>
            </CardActions>
            
        </Card>
    )
  }