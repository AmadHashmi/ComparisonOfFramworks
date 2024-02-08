import "./App.css";
import NotesPage from "./pages/NotesPage";
import { Route, Routes } from "react-router";
import CreateNote from "./components/CreateNote";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<NotesPage />} />
        <Route path="/notes/new" element={<CreateNote />} />
        <Route path="/notes/edit/:id" element={<CreateNote />} />
        <Route path="/notes/view/:id" element={<CreateNote />} />
      </Routes>
    </div>
  );
}

export default App;
