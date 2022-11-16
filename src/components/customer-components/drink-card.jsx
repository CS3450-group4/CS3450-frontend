import {
    Card,
    Button,
    Typography,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader,
    createTheme,
    ThemeProvider,
  } from "@mui/material";
import "./customer.css"
import { useNavigate } from "react-router-dom";

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    mygrey: palette.augmentColor({
      color: {
        main: "#3A3A3A"
      }
    })
  }
});

  export default function DrinkCard({menuitem}) {
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
        <Card className="DrinkCard" variant="outlined">
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
            <CardContent className="DrinkCardContent">
                <Typography variant="caption" >
                    {DrinkIngredients(menuitem.ingredientList)}
                </Typography>
            </CardContent>
            <CardActions className="DrinkButton">
                <ThemeProvider theme={theme}>
                <Button color="mygrey" variant="contained" size="medium" onClick={() => {
                    window.localStorage.setItem('selectedDrink', JSON.stringify(selectedDrink));
                    navigation("../drink", {replace: true})}
                }>Order</Button>
                </ThemeProvider>
            </CardActions>
            
        </Card>
    )
  }