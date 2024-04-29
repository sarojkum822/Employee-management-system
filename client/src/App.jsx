import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
// import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import CreateEmployeeForm from "./pages/CreateEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import EmployeeList from "./pages/EmployeeList";
import { useContext, useEffect } from "react";

function App() {
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        
        <Route path="/createemployee" element={<CreateEmployeeForm/>} />
        <Route path="/updateemployee/:id" element={<UpdateEmployee/>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
