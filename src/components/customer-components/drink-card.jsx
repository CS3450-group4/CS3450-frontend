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
import "../main-view-components/general.css"
import { useNavigate } from "react-router-dom";

  export default function DrinkCard({menuitem, setFrapOrder}) {
    let navigation = useNavigate()

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
        <Card className={"DrinkCard"} variant="outlined" style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: 250}}>
            <CardHeader
                title={menuitem.name}
                subheader={`Price: $${(menuitem.price/100).toFixed(2)}`}
            />
            <CardMedia
            className="DrinkCardMedia"
            component="img"
            image={require('./frap1.jpg')}
            alt="Frappichino"
            />
            <CardContent>
                <Typography variant="caption" >
                    {DrinkIngredients(menuitem.ingredientList)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={() => {setFrapOrder(menuitem);
                    console.log(menuitem)
                    navigation("../drink", {replace: true})}
                }>Order</Button>
            </CardActions>
            
        </Card>
    )
  }