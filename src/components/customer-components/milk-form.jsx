import { FormControl, InputLabel, Select, MenuItem, css } from "@mui/material";
import { useEffect, useState } from "react";

export default function MilkForm({ingredient, changeMilk}){
    const [milkList, setMilkList] = useState([])
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
            data.forEach(ingredient => {
                if(ingredient.isMilk) {
                    milks.push(ingredient)
                }
            });
            setMilkList(milks)
          }
        )
    }

    return(
        <FormControl fullWidth>
            <InputLabel id="milkOptions">Milk Options</InputLabel>
            <Select
                labelId="milkOptions"
                id="selectMilk"
                value={ingredient.name}
                label="selectMilk"
                name={ingredient.name}
                onChange={changeMilk}
            >
                {/* {milkMenuItem} */}
                {milkList.map((milk, index) => 
                    <MenuItem value={milk.name} key={index}>{milk.name}</MenuItem>
                )}
            </Select>
         </FormControl>
    )
}
