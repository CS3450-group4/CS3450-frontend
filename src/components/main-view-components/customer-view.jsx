import {
    Box,
    Grid
  } from "@mui/material";
import CompositeTitleHeader from "../composite-header";
import StickyFooter from "../sticky-footer";
import "./../../App.css";
import "./general.css";
import MenuGrid from  "../customer-components/menu-grid"
export default function CustomerView() {
    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer" >
                {/* TODO: CREATE A COMPONENT & FUNCTION FOR THE GRID */}
                <MenuGrid ></MenuGrid>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    Replace With Drink Monitor
                </StickyFooter>
            </Box>
        </div>
    )
}