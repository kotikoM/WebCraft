import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { Suspense, useState } from "react";
import HomePage from "./pages/homePage";
import ProductsList from "./pages/productsList";
import ContactUs from "./pages/contactUs";
import SignIn from "./pages/signIn";
import Profile from "./pages/profile";
import ProductPage from "./pages/productPage";
import LanguageSwitcher from "./components/languageSwitcher";
import "./App.css";
import { useTranslation } from "react-i18next";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";

function App() {
  const [t, i18n] = useTranslation("global");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLanguageChange = (s) => {
    i18n.changeLanguage(s);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "ge", name: "ქართული" },
  ];

  return (
    <>
      <div className="app">
        <Router>
          <nav>
            <Link to="/">
              <h1>{t("title")}</h1>
            </Link>

            <ul>
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <Link to="/products">{t("products")}</Link>
              </li>
              <li>
                <Link to="/contact-us">{t("contact-us")}</Link>
              </li>
              <li>
                <LanguageSwitcher
                  languages={languages}
                  currentLanguage={i18n.language}
                  onLanguageChange={handleLanguageChange}
                />
              </li>
              <li>
                {isSignedIn ? (
                  <Link to="/profile" className="profile">
                    <IoPersonCircleOutline />
                  </Link>
                ) : (
                  <Link to="/sign-in" className="sign-in-link">
                    {t("sign-in")}
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          <Suspense fallback={<>Loading...</>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route
                path="/sign-in"
                element={<SignIn onSignIn={setIsSignedIn} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
      <div className="footer">
        <ul>
          <li>{t("footer.follow-us")}</li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.twitter")}
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.facebook")}
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.instagram")}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
