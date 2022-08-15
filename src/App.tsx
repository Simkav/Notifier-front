import Header from "./features/Header";
import React, { FC, useEffect, useTransition } from "react";
import UserConnections from "./features/UserConnections";
import css from "./index.module.scss";
import { AuthorizationForm } from "./features/Authorization";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { setCurrentUser } from "./service/slices/currentUser/currentUser.slice";
import { useAppDispatch } from "./service/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: FC = () => {
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const userEmail = localStorage.getItem("email");

      const jwt = localStorage.getItem("jwt");
      console.log(1);

      if (userEmail && jwt) {
        dispatch(setCurrentUser({ jwt, userEmail }));
      }
    });
    console.log(2);
  }, []);

  console.log(3);

  // const userEmail = localStorage.getItem("email");
  //
  // const jwt = localStorage.getItem("jwt");
  // console.log(jwt, userEmail, 123213);
  //
  // if (userEmail && jwt) {
  //   dispatch(setCurrentUser({ jwt, userEmail }));
  // }
  //
  // console.log(1);
  //
  // console.log(2);

  return !isPending ? (
    <div className={css.container}>
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    </div>
  ) : (
    <></>
  );
};

export default App;
