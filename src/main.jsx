import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from 'react-redux';
import {store} from "./store/store.jsx";

import { I18nextProvider } from "react-i18next"; 
import i18next from "i18next";
import global_en from "./assets/translation/en/global.json";
import global_ge from "./assets/translation/ge/global.json";
import home_en from "./assets/translation/en/home.json";
import home_ge from "./assets/translation/ge/home.json";
import productData_en from "./assets/translation/en/productData.json";
import productData_ge from "./assets/translation/ge/productData.json";
import productsList_en from "./assets/translation/en/productsList.json";
import productsList_ge from "./assets/translation/ge/productsList.json";
import cart_en from "./assets/translation/en/cart.json";
import cart_ge from "./assets/translation/ge/cart.json";
import signIn_en from "./assets/translation/en/signIn.json";
import signIn_ge from "./assets/translation/ge/signIn.json";
const resources = {
  en: {
    global: global_en,
    home : home_en,
    productData : productData_en,
    productsList : productsList_en,
    cart : cart_en,
    signIn : signIn_en
  },
  ge: {
    global: global_ge,
    home : home_ge,
    productData : productData_ge,
    productsList : productsList_ge,
    cart : cart_ge,
    signIn : signIn_ge
  },
};

i18next.init({
  resources,
  lng: "en",
  fallbackLng: "en",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
      <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
