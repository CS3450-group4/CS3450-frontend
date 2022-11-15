import { Typography, Box, Button } from "@mui/material"
import { Stack } from "@mui/system"
import MilkForm from "./milk-form"
import LessRegExtraForm from "./less-reg-extra-form"
import "./customer.css"
import { useEffect, useState } from "react"
import YesNoForm from "./yes-no-form"

export default function IngredientForm({ingredients, changeMilk, changeIngredientAmount, removeIngredient}){
    const [milks, setMilks] = useState([])
    const [yesOrNoIngs, setYesOrNo] = useState([])
    const [lessRegExtraIng, setLessRegExtra] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8000/api/ingredient/`,{
            method: 'GET',
            headers: {
                "Authorization": "Token " + window.localStorage.getItem('token')
            },
    })
        .then((res) => res.json())
        .then(
          (data) => {
            var milks = []
            var yesOrNo = []
            var lessRegExtra = []
            data.forEach(ingredient => {
                if(ingredient.options == 0) {
                    milks.push(ingredient.name) 
                }
                if(ingredient.options == 1) {
                    yesOrNo.push(ingredient.name)
                }
                if(ingredient.options == 2) {
                    lessRegExtra.push(ingredient.name)
                }
            });
            setMilks(milks)
            setYesOrNo(yesOrNo)
            setLessRegExtra(lessRegExtra)
          }
        )
    }

    const yesNoRemoval = (event)=> {
        const {value, name} = event.target
        ingredients.map(ing => {
            if(ing.name === name && value === 0) {
                removeIngredient(ing)
            }
        })
    }

    const milkMap = ingredients.map((ingredient, index) => {
        if(ingredient.options == 0) {
            var event = {}
            event["target"] = { value: 1, name: ingredient.name }
            changeIngredientAmount(event)
        }
        if (ingredient.isMilk && (milks.indexOf(ingredient.name) != -1)) {
            return(
                <MilkForm ingredient={ingredient} changeMilk={changeMilk}></MilkForm>
            )  
        }
    });
    
    const lessRegExtraIngs = ingredients.map((ingredient, index) => {
        if(ingredient.options == 0) {
            var event = {}
            event["target"] = { value: 1, name: ingredient.name }
            changeIngredientAmount(event)
        }
        if(!ingredient.isMilk && (lessRegExtraIng.indexOf(ingredient.name) != -1)) {
            return(
                <Stack direction="row" key={index}>
                    <LessRegExtraForm ingredient={ingredient} changeIngredientAmount={changeIngredientAmount}></LessRegExtraForm>
                    <Button onClick={() => {removeIngredient(ingredient)}}>X</Button>
                </Stack>
            )
        }
        
    })

    const yesNoIngs = ingredients.map((ingredient, index) => {
        if(ingredient.options == 0) {
            var event = {}
            event["target"] = { value: 1, name: ingredient.name }
            changeIngredientAmount(event)
        }
        if(!ingredient.isMilk && (yesOrNoIngs.indexOf(ingredient.name) != -1)) {
            return(
                <Stack direction="row" key={index}>
                    <YesNoForm ingredient={ingredient} yesNoRemoval={yesNoRemoval}/>
                </Stack>
            )
        }
    })
    
    function IngredientForms() {
        return (
            <Stack spacing={2}>
                {milkMap}
                {yesNoIngs}
                {lessRegExtraIngs}
            </Stack>
        )
    }

    return(
        <Box className="IngredientForm">
        {
            (ingredients.length != 0)  ? (
                <IngredientForms></IngredientForms>
            ) : <Typography>EMPTY DRINK</Typography> 
        }
        </Box>
    )
    
}