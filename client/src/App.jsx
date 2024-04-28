import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/EmployeeList";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
// import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import CreateEmployeeForm from "./pages/CreateEmployee";

function App() {
  // const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/createemployee" element={<CreateEmployeeForm/>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
