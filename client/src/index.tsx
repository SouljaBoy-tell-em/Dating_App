import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Store from "./shared/store/store";
import "./style.css";

interface State {
  store: Store;
}

const store = new Store();

const Context = createContext<State>({
  store,
});
export default Context;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Context.Provider value={{ store }}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Context.Provider>
);
