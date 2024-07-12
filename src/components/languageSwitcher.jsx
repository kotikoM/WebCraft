import React, { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import "../styles/languageSwitcher.css";

const LanguageSwitcher = ({ languages, currentLanguage, onLanguageChange }) => {
  const [showLanguages, setShowLanguages] = useState(false);

  const handleMouseEnter = () => {
    setShowLanguages(true);
  };

  const handleMouseLeave = () => {
    setShowLanguages(false);
  };

  return (
    <div
      className="language-switcher"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CiGlobe className="globe-icon" />
      {showLanguages && (
        <ul className="language-list">
          {languages.map((language) => (
            <li
              key={language.code}
              onClick={() => onLanguageChange(language.code)}
            >
              {language.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
