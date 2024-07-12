import React from "react";
import "../styles/homePage.css";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const [t, i18n] = useTranslation("home");

  return (
    <div className="home">
      <p className="description">{t("description")}</p>
      <div className="illustration">
        <p>{t("what-we-do")}</p>

      <img src="./background/fractal-glass.png" alt="" className = "fractal-glass"/>
      </div>
    </div>
  );
};

export default HomePage;
