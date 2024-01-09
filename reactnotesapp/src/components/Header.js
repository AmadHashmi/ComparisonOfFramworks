// src/components/Header.js
import React from "react";

const Header = ({ pageTitle, onCreateNote }) => {
  return (
    <header className="header">
      <div className="pageTitle">{pageTitle}</div>
      <button onClick={onCreateNote}>New Note</button>
    </header>
  );
};

export default Header;
