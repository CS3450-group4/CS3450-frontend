import {
    Card,
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
    var newIngList = []
    menuitem.ingredientList.forEach(ingredient => {
        if(ingredient.options === 0) {
            ingredient.options = 2;
        }
        newIngList.push(ingredient)
    })
    const selectedDrink = {
        id: menuitem.id,
        ingredientList: newIngList,
        name: menuitem.name,
        price: menuitem.price,
        size: menuitem.size,
    }

    function DrinkIngredients(ingredientList) {
        var ingredientString = "This drink contains "
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
                <Button size="medium" onClick={() => {
                    window.localStorage.setItem('selectedDrink', JSON.stringify(selectedDrink));
                    navigation("../drink", {replace: true})}
                }>Order</Button>
            </CardActions>
            
        </Card>
    )
  }