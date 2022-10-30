import "./header.css"
import {
    Typography,
    Box,
  } from "@mui/material";
export default function TitleHeader() {
    return (
        <Box class="TitleContainer">
            <Typography variant="h1" component="h1">
                Frappy Time
            </Typography>
        </Box>
    )
}