import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './pages/login'
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashBoard";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
