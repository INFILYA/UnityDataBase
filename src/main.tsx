import React from "react";
import ReactDOM from "react-dom/client";
import UnityDataBase from "./UnityDataBase.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./states/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UnityDataBase />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
