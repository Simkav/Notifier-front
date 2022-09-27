import React, { FC } from "react";
import css from "./index.module.scss";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Backdrop,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setCurrentUser } from "./service/slices/currentUser/currentUser.slice";
import { useAppDispatch } from "./service/store";

const Main = React.lazy(() => import("./features/Main"));
const Header = React.lazy(() => import("./features/Header"));
const Authorization = React.lazy(() => import("./features/Authorization"));
const UserConnections = React.lazy(() => import("./features/UserConnections"));

const darkTheme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            backgroundColor: "#0d1f33",
          },
          backgroundColor: "#0a1929",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "lightgrey",
        },
      },
    },
  },

  palette: {
    mode: "dark",
    secondary: {
      contrastText: "#000",
      dark: "#492356",
      light: "#ff7961",
      main: "#692a68",
    },
  },
});

const App: FC = () => {
  const queryClient = new QueryClient();

  const dispatch = useAppDispatch();

  const userEmail = localStorage.getItem("email");

  const jwt = localStorage.getItem("jwt");

  if (userEmail && jwt) {
    dispatch(setCurrentUser({ jwt, userEmail }));
  }
  // TODO сделать компонент подгрузки

  return (
    <div className={css.container}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <Header />
              <React.Suspense
                fallback={
                  <Backdrop
                    open={true}
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                }
              >
                <Routes>
                  <Route element={<Main />} path="/main" />
                  <Route element={<Navigate replace to="/main" />} path="/" />
                  <Route element={<Authorization />} path="/user/auth" />
                  <Route element={<UserConnections />} path="/user/:login" />
                  <Route element={<div>404</div>} path="*" />
                </Routes>
              </React.Suspense>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
