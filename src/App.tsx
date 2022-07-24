import Authorization from "./features/Authorization";
import Header from "./features/Header";
import React from "react";
import css from "./index.module.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className={css.container}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Navigate replace to="/main" />} path="/" />
          <Route element={<Authorization />} path="/auth" />
          <Route element={<p>Main</p>} path="/main/*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
