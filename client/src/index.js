import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";
import { CategoryProvider } from "./components/category/CategoryContext";
ReactDOM.render(
  <CategoryProvider>
    <GlobalStyles />
    <App />
  </CategoryProvider>,

  document.getElementById("root")
);
