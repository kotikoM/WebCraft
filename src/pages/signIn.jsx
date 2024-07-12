import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/signIn.css";

const SignIn = ({ onSignIn }) => {
  const [t, i18n] = useTranslation("signIn");
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    onSignIn(true);
    navigate("/");
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="sign-in-wrapper">
      <img src="/background/aurora.png" alt="" />

      <div className="sign-in-form">
        <h2>{isSignUp ? t("sign up") : t("sign in")}</h2>
        <form onSubmit={handleSignIn}>
          {isSignUp && (
            <>
              <input type="email" name="email" placeholder={t("email")} />
              <input
                type="text"
                name="firstName"
                placeholder={t("first name")}
              />
              <input type="text" name="lastName" placeholder={t("last name")} />
            </>
          )}
          <input type="text" name="username" placeholder={t("username")} />
          <input type="password" name="password" placeholder={t("password")} />
          <button type="submit" className="submit">
            {isSignUp ? t("sign up button") : t("sign in button")}
          </button>
        </form>

        <div className="or"></div>

        {!isSignUp && (
          <>
            <button className="social-button facebook">
              {t("sign in FB")}
            </button>
            <button className="social-button apple">{t("sign in AP")}</button>
            <button className="social-button google">{t("sign in GO")}</button>
          </>
        )}

        <div className="toggle-mode">
          {isSignUp ? (
            <p>
              {t("already have an account")}
              <button onClick={toggleMode} className="sign-in-up">{t("sign in")}</button>
            </p>
          ) : (
            <p>
              {t("don't have an account")}
              <button onClick={toggleMode} className="sign-in-up">{t("sign up")}</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
