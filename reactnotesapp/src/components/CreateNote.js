import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateNote = ({ onSubmit, onEdit }) => {
  const { id, editId } = useParams();
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const [editMode, setEditMode] = useState(!!id); // Check if editId exists
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    if (id) {
      setEditMode(true);
      const noteToEdit = storedNotes.find((note) => note.id === parseInt(id));
      console.log(noteToEdit);
      if (noteToEdit) {
        setFormData({
          id: noteToEdit.id,
          title: noteToEdit.title,
          description: noteToEdit.description,
        });
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the updated note data from the form
    const updatedNote = {
      id: editMode
        ? parseInt(id)
        : storedNotes.length > 0
        ? storedNotes[storedNotes.length - 1].id + 1
        : 1,
      title: formData.title,
      description: formData.description,
    };

    console.log(updatedNote);

    // Update local storage with the new or edited note
    const updatedNotes = editMode
      ? storedNotes.map((note) =>
          note.id === parseInt(id) ? updatedNote : note
        )
      : [...storedNotes, updatedNote];

    console.log(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    console.log(localStorage);

    // If in edit mode, navigate back to the list page
    navigate("/");
  };

  return (
    <div>
      <div>{editMode ? "edit" : "view"}</div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">{editMode ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default CreateNote;
