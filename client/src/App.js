import Project from "./components/projectList";
import Task from "./components/taskList";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Project/>} />
        <Route path="/Task/:id" element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
