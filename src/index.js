import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "../src/features/Store";
import { Provider } from "react-redux";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { purple } from "@mui/material/colors";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    // primary: purple
  },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </Provider>
    </ThemeProvider>
);
