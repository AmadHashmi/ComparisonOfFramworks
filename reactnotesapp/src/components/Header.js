import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
const Header = ({ onCreateNote }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleTitleClick = () => {
    navigate("/");
  };
  return (
    <header className="header">
      <h2 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
        Notes App
      </h2>
      {!pathname.includes("new") &&
        !pathname.includes("view") &&
        !pathname.includes("edit") && (
          <Button
            id="new-note"
            className="newNoteButton"
            variant="primary"
            color="primary"
            onClick={onCreateNote}
          >
            New Note
          </Button>
        )}
    </header>
  );
};

export default Header;
