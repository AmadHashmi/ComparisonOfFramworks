// src/components/Footer.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotesList from "../components/NotesList";
import { useNavigate } from "react-router";
const NotesPage = () => {
  const navigate = useNavigate();
  const initialNotes = [
    { id: 1, title: "Note1", description: "This is Note1" },
    { id: 2, title: "Note2", description: "This is Note2" },
    { id: 3, title: "Note3", description: "This is Note3" },
  ];

  const [notes, setNotes] = useState([]);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);
  const handleCreateNote = () => {
    navigate("/notes/new");
    // Reload notes from local storage after creating a new note
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    setNotes(storedNotes);
  };
  const handleEditNote = (id) => {
    navigate("/notes/edit/" + id);
  };
  const handleDeleteNote = (id) => {
    // Filter out the note with the specified id

    const updatedNotes = notes.filter((note) => note.id != id);
    // Update local storage with the updated notes
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    // Update state to re-render the component
    setNotes(updatedNotes);
  };
  return (
    <div>
      <Header onCreateNote={handleCreateNote} />
      <NotesList
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
      <Footer />
    </div>
  );
};

export default NotesPage;
