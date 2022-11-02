import {
    Box,
  } from "@mui/material";
import CompositeTitleHeader from "../shared-components/composite-header";
import StickyFooter from "../shared-components/sticky-footer";
import "./../../App.css";
import "./general.css";
import HoursAdder from "../shared-components/hours-adder";
export default function BaristaView() {
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
                    <HoursAdder className="HoursAdder"/>
                </StickyFooter>
            </Box>
        </div>
    )
}