import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/home.css';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';


import { Button } from '@mui/material';



const EmployeeList = () => {

  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [count,setCount]=useState("");

  const fetchItems = async () => {
    try {
      const url = searchEmployee ? `http://localhost:8080/api/v1/employee/getAllEmployee?name=${searchEmployee}` : "http://localhost:8080/api/v1/employee/getAllEmployee";
      const res = await axios.get(url);
      setEmployeeDetails(res.data);
      setCount(res.data.length);
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

  const handledDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/employee/deleteemployee/?id=${id}`);
      alert("Employee deleted successfully");

      console.log(res);
      fetchItems();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  
  // table pagination
  let sequence = 0;
  function getRowId() {
    return sequence++;
  }
  const columns = [

    { field: 'name', headerName: 'Name', width: 100, sortable: true },
    { field: 'email', headerName: 'Email address', width: 130 },
    { field: 'mobileNo', headerName: 'Mobile no.', width: 180 },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 90,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 160,
    },
    {
      field: 'course',
      headerName: 'Course',
      width: 180,
    }, 
    {
      field: 'imgUpload',
      headerName: 'Image',
      editable:true,
      width: 260,
      renderCell: (params) => <img className='image-upload' src={params.value} />
    }, 
    {
      field: 'edit',
      headerName: 'Edit',
      width: 160,
      renderCell: (cellValues) => {
        return (< Button variant="outlined" > <Link className='edit' to={`/updateemployee/${cellValues.row._id}`}>Edit</Link></ Button>);
      }
    }, 
    {
      field: 'delete',
      headerName: 'Delete',
      width: 160,
      renderCell: (cellValues) => {

        return (< Button variant="outlined" color="error" onClick={() => handledDelete(cellValues.row._id)}>Delete</ Button>);
      }
    },


  ];

  const rows = employeeDetails;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });

  const [myFunc, mff] = React.useState(paginationModel);
  // table pagination
  return (
    <>
    <h2>Employee Details</h2>
        <div>
        </div>
        <div className='input-search'>
          <p className='p'>Total count: {count} </p>
          <Link to={'/createemployee'} className='create-btn'>Add Employee</Link>
          <input type="text" placeholder='Search by Name' onChange={handleSearch} />
          </div>
      <div style={{ height: 400, width: '100%' }}>

        <DataGrid getRowId={(row) => getRowId()}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onPaginationModelChange={setPaginationModel}
          onPageChange={myFunc}
        />
      </div>
      <div>
        
        {/* <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Course</th>
              <th>Gender</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
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
                <td><Link to={`/updateemployee/${employee._id}`}>Edit</Link></td>
                <td><button onClick={() => handledDelete(employee._id)}>Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </>
  );
}

export default EmployeeList;
