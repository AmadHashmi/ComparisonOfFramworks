// src/components/Header.js
import React from "react";
import Button from "@mui/material/Button";
const Header = ({ onCreateNote }) => {
  return (
    <header className="header">
      <h2>Notes App</h2>
      <Button
        className="newNoteButton"
        variant="contained"
        color="primary"
        onClick={onCreateNote}
      >
        New Note
      </Button>
    </header>
  );
};

export default Header;
