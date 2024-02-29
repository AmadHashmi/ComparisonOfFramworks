// components/NoteList.js
import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const NotesList = ({ notes, onDeleteNote, onEditNote, onViewNote }) => {
  return (
    <div className="notes-list">
      <h2>Your Notes</h2>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td onClick={() => onViewNote(note.id)}>{note.title}</td>
              <td onClick={() => onViewNote(note.id)}>{note.description}</td>
              <td>
                <Button
                  id={"update-note" + note.id}
                  onClick={() => onEditNote(note.id)}
                  className="m-2"
                >
                  Edit
                </Button>
                <Button
                  id={"delete-note" + note.id}
                  onClick={() => onDeleteNote(note.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NotesList;
