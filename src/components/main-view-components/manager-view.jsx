import {
    Box,
  } from "@mui/material";
import CompositeTitleHeader from "../composite-header";
import PayEmployees from "../pay-employees";
import StickyFooter from "../sticky-footer";
import "./../../App.css";
import "./general.css";
export default function ManagerView() {
    return (
        <div className="App">
            <Box className="CompositeTitleHeaderContainer">
                <CompositeTitleHeader />
            </Box>
            <Box className="WorkingViewContainer">
                Insert Custom Components Here. Can change styling of WorkingViewContainer if Needed
            </Box>
            <Box className="StickyFooterContainer">
                <StickyFooter>
                    <PayEmployees className="PayEmployeesContainer"/>
                </StickyFooter>
            </Box>
        </div>
    )
}