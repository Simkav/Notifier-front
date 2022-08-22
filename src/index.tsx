import "./index.scss";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { getStore } from "./service/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = getStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
