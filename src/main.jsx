import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import './index.css';
import { BrowserRouter } from "react-router-dom";  // ✅ import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>   {/* ✅ Wrap your App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);
