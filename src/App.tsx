import Header from "./features/Header";
import React from "react";
import UserConnections from "./features/UserConnections";
import css from "./index.module.scss";
import {AuthorizationForm} from "./features/Authorization";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { getStore } from "./service/store";

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
              <Route element={<AuthorizationForm />} path="/user/auth" />
              <Route element={<UserConnections />} path="/user/:login" />
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
