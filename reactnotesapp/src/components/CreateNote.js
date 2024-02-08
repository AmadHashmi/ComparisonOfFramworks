import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Form, Button } from "react-bootstrap";
const CreateNote = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const [editMode, setEditMode] = useState(!!id);
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

    const updatedNotes = editMode
      ? storedNotes.map((note) =>
          note.id === parseInt(id) ? updatedNote : note
        )
      : [...storedNotes, updatedNote];

    console.log(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    console.log(localStorage);

    navigate("/");
  };

  // return (
  //   <div>
  //     <Header></Header>
  //     <div className="create-form">
  //       <div>
  //         {" "}
  //         <h2>{editMode ? "edit" : "view"}</h2>{" "}
  //       </div>
  //       <form onSubmit={handleSubmit}>
  //         <label>Title:</label>
  //         <input
  //           type="text"
  //           name="title"
  //           value={formData.title}
  //           onChange={handleChange}
  //           required
  //         />
  //         <label>Description:</label>
  //         <input
  //           type="text"
  //           name="description"
  //           value={formData.description}
  //           onChange={handleChange}
  //           required
  //         />

  //         <button type="submit">{editMode ? "Update" : "Save"}</button>
  //       </form>
  //     </div>
  //     <Footer />
  //   </div>
  // );
  return (
    <div>
      <Header />
      <Container className="create-form">
        <Form onSubmit={handleSubmit} className="w-50 mx-auto">
          {!pathname.includes("view") && (
            <h2 className="form-title">
              {editMode ? "Edit Note" : "Create Note"}
            </h2>
          )}
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label className="form-label">Title:</Form.Label>
            <Form.Control
              disabled={pathname.includes("view")}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label className="form-label">Description:</Form.Label>
            <Form.Control
              disabled={pathname.includes("view")}
              as="textarea" // Use textarea instead of text input
              rows={5} // Set the number of rows for the textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {!pathname.includes("view") && ( // Check if URL contains "view"
            <Button
              id="submit"
              variant="primary"
              type="submit"
              className="mt-3"
            >
              {editMode ? "Update Note" : "Create Note"}
            </Button>
          )}
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateNote;
