import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TaskForm from "./pages/TaskForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-6 max-w-6xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/repuestos/new" element={<TaskForm />} />
          <Route path="/repuestos/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;