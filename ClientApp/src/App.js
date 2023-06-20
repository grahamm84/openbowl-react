import React from "react";
import { ThemeProvider, Box } from "@mui/material";
import LoggedInLayout from "global/layouts/LoggedInLayout/LoggedInLayout";
import GuestLayout from "global/layouts/GuestLayout";
import * as storage from "global/helpers/storageService";
import { useAuth } from "global/useAuth";
import { mainTheme } from "global/theme/mainTheme";
import { themeCreator } from "global/theme/base";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  const auth = useAuth();
  //let themeName = "PureLightTheme";
  let themeName = "GreyGooseTheme";
  //let themeName = "PurpleFlowTheme";

  //const theme = mainTheme;
  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    window.localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <CssBaseline />
        {/* <Box
        sx={{
          display: "flex",
          flex: 1,
          height: "100%",
          background: `${theme.palette.background.default}`,
        }}
      > */}
        {auth.user ? <LoggedInLayout /> : <GuestLayout />}
        {/* </Box> */}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export { App };
