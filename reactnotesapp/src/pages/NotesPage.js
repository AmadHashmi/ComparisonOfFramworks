// src/components/Footer.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotesList from "../components/NotesList";
import { useNavigate } from "react-router";
const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);
  const handleCreateNote = () => {
    navigate("/notes/new");

    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    setNotes(storedNotes);
  };
  const handleEditNote = (id) => {
    navigate("/notes/edit/" + id);
  };
  const handleViewNote = (id) => {
    navigate("/notes/view/" + id);
  };
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setNotes(updatedNotes);
  };
  return (
    <div>
      <Header onCreateNote={handleCreateNote} />
      <NotesList
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        onViewNote={handleViewNote}
      />
      <Footer />
    </div>
  );
};

export default NotesPage;
