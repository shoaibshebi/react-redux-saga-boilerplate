import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { NotificationContainer } from "react-notifications";
import { StyledEngineProvider } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Root from "./root";
import store from "./state/redux-saga";
import Auth from "./User/pages/Auth/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-notifications/lib/notifications.css";

/** Global styling */
import "./index.css";

const mytheme = createTheme({
  palette: {
    primary: {
      main: "#1A1A1A", //theme
      light: "#282828", //lightdark
      dark: "#000000", //dark
      contrastText: "#373737", //middle dark
    },
    secondary: {
      main: "#707070",
      light: "#FFFFFF",
      dark: "#C7C7C7",
      contrastText: "#E3E3E3",
    },
    info: {
      main: "#DF4646", //red
      light: "#F26826", //orange
      dark: "#D5D5D5", //gray
    },
    background: {
      default: "#1A1A1A",
    },
    action: {
      hover: "none",
    },
  },
  shape: {
    borderRadius: "4px",
  },
});
ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={mytheme}>
        <BrowserRouter>
          <Routes>
            {/* direct/simple login */}
            <Route path="/auth/login" element={<Auth />} />
            {/* if no route exsts */}
            <Route path="*" element={<Root />} />
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </MuiThemeProvider>
    </StyledEngineProvider>
    <NotificationContainer />
  </Provider>,

  document.getElementById("root")
);
