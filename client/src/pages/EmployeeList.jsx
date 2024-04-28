import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/home.css'

const Home = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");

  const fetchItems = async () => {
    try {
      const url = searchEmployee ? `http://localhost:8080/api/v1/employee/getAllEmployee?name=${searchEmployee}` : "http://localhost:8080/api/v1/employee/getAllEmployee";
      const res = await axios.get(url);
      setEmployeeDetails(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [searchEmployee]);

  const handleSearch = (e) => {
    setSearchEmployee(e.target.value);
  }

  return (
    <>
      <div>
        <h2>Employee Details</h2>
        <div>
          <Link to={'/createemployee'} className='create-btn'>Add Employee</Link>
        </div>
        <div className='input-search'><input type="text" placeholder='Search by Name' onChange={handleSearch} /></div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Course</th>
              <th>Gender</th>
              <th>Image</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {employeeDetails.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.course}</td>
                <td>{employee.gender}</td>
                <td><img src={employee.imgUpload} alt="Employee" style={{ width: "50px", height: "50px" }} /></td>
                <td>{new Date(employee.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
