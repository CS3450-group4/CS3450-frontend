import {
    Box,
  } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CompositeTitleHeader from "../shared-components/composite-header";
import ManagerOptions from "../manager-components/manager-options";
import PayEmployees from "../manager-components/pay-employees";
import StickyFooter from "../shared-components/sticky-footer";
import "./../../App.css";
import AddDrink from "../manager-components/add-drink";
import AddIngrident from "../manager-components/add-ingrident";
import BuyIngredients from "../manager-components/buy-ingridents";
import ChangeAuth from "../manager-components/change-auth-op";
import "./general.css";
import RemoveDrink from "../manager-components/remove-drink";
export default function ManagerView() {
    let navigation = useNavigate()
    useEffect(() => {
        navigation("options")
    }, [])
    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer">
                <Routes>
                    <Route path="options" element={<ManagerOptions className="ManagerMainOptions"/>} />
                    <Route path="create-drink" element={<AddDrink className="DrinkAdderContainer" ingredientClassName="NewDrinkIngridentScroller"/>} />
                    <Route path="add-ingrident" element={<AddIngrident className="ManagerAddIngridentContainer"/>} />
                    <Route path="buy-ingredients" element={<BuyIngredients className="ManagerBuyIngredientsContainer"/>} />
                    <Route path="change-auth" element={<ChangeAuth className="ManagerMainViewAuthSelection"/>} />
                    <Route path="remove-drink" element={<RemoveDrink className="DrinkRemovalContainer"/>} />
                </Routes>
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <PayEmployees className="PayEmployeesContainer"/>
                </StickyFooter>
            </Box>
        </div>
    )
}