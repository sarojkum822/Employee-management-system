import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import '../styles/Header.css'

const Header = () => {
  const{isAuthenticated,setIsAuthenticated,loading,setLoading,user}=useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/v1/users/logout", {
        withCredentials: true,
      });

      toast("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message,"cannot");
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <div>
          EMS LOGO
        </div>
      </div>
      <article>
        <Link to={"/"}>EmployeeList</Link>
        <Link to={"/profile"}>
           {isAuthenticated ?`${user.name}`:"Profile"}
        </Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
