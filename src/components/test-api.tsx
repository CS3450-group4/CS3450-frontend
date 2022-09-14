import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from "@mui/material";

import { menu } from "./types";

const TestApi = ({
  apiData,
}: {
  apiData: menu
}) => {
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  const handleitemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value)
  }
  const handleItemPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemPrice(event.target.value)
  }
  const createMenuItem = () => {
    const newItem = {
      name: itemName,
      price: itemPrice,
    }
    fetch('http://localhost:8000/api/additem', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(newItem),
    })
    console.log("item created")
  }

  return (
    <Box>
      <Typography variant="h1">Inside test-api component</Typography>
      {apiData.items.map((menuItems, i) => {
        return (
          <Card key={i}>
            <CardContent sx=
              {{
                backgroundColor: "grey",
                border: "1px solid black"
              }}
            >
              <Typography>Item name = {menuItems.name}</Typography>
              <Typography>Item price = {menuItems.price}</Typography>
            </CardContent>
          </Card>
        )
      })}
      <TextField
        value={itemName}
        onChange={handleitemNameChange}></TextField>
      <TextField value={itemPrice} onChange={handleItemPriceChange}></TextField>
      <Button onClick={createMenuItem}>Post</Button>
    </Box>
  )
}

export default TestApi
