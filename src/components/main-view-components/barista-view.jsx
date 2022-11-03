import {
    Box,
  } from "@mui/material";
import { Route, Roputes, useNavigate } from "react-router-dom";
import CompositeTitleHeader from "../shared-components/composite-header";
import StickyFooter from "../shared-components/sticky-footer";
import "./../../App.css";
import "./general.css";
import HoursAdder from "../shared-components/hours-adder";
import CheckIngredients from "../barista-components/check-ingredients";
export default function BaristaView() {
    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer">
                <Routes>
                    <Route path="check-ingredients" element={<CheckIngredients className="DrinkAdderContainer" ingredientClassName="NewDrinkIngridentScroller"/>} />
                </Routes>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <HoursAdder className="HoursAdder"/>
                </StickyFooter>
            </Box>
        </div>
    )
}
