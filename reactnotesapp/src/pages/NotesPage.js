// src/components/Footer.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotesList from "../components/NotesList";
import { useNavigate } from "react-router";
const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  //   setNotes(storedNotes);
  // }, []);
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (storedNotes.length === 0) {
      // Initialize with 100 notes if localStorage is empty
      const initialNotes = [];
      for (let i = 1; i <= 1000; i++) {
        initialNotes.push({
          id: i,
          title: `Note ${i}`,
          description: `Description for note ${i}`,
        });
      }
      localStorage.setItem("notes", JSON.stringify(initialNotes));
      setNotes(initialNotes);
    } else {
      setNotes(storedNotes);
    }
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
