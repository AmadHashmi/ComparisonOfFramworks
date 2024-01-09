// components/NoteList.js
import React from "react";
import { Link } from "react-router-dom";

const NotesList = ({ notes, onDeleteNote, onEditNote }) => {
  return (
    <div>
      <h2>Your Notes</h2>
      <table>
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
              <td>
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </td>
              <td>{note.description}</td>
              <td>
                <button onClick={() => onEditNote(note.id)}>Edit</button>
                <button onClick={() => onDeleteNote(note.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesList;
