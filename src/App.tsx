import Authorization from "./features/Authorization";
import Header from "./features/Header";
import React from "react";
import css from "./index.module.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import {getStore} from "./service/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const store = getStore();

const App = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <div className={css.container}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route element={<Navigate replace to="/main" />} path="/" />
              <Route element={<Authorization />} path="/userActions" />
              <Route element={<p>Main</p>} path="/main" />
              <Route element={<div>404</div>} path="*" />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
