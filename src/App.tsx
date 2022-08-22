import React, { FC } from "react";
import css from "./index.module.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import { setCurrentUser } from "./service/slices/currentUser/currentUser.slice";
import { useAppDispatch } from "./service/store";

const Main = React.lazy(() => import("./features/Main"));
const Header = React.lazy(() => import("./features/Header"));
const Authorization = React.lazy(() => import("./features/Authorization"));
const UserConnections = React.lazy(() => import("./features/UserConnections"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: FC = () => {
  // const queryClient = new QueryClient();

  const dispatch = useAppDispatch();

  const userEmail = localStorage.getItem("email");

  const jwt = localStorage.getItem("jwt");

  if (userEmail && jwt) {
    dispatch(setCurrentUser({ jwt, userEmail }));
  }

  return (
    <div className={css.container}>
      {/* <QueryClientProvider client={queryClient}>*/}
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route element={<Main />} path="/main" />
            <Route element={<Navigate replace to="/main" />} path="/" />
            <Route element={<Authorization />} path="/user/auth" />
            <Route element={<UserConnections />} path="/user/:login" />
            <Route element={<div>404</div>} path="*" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      {/* </QueryClientProvider>*/}
    </div>
  );
};

export default App;
