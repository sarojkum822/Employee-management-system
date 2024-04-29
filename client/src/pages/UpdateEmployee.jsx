import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
    const { id } = useParams();

    const [updateformData, setUpdateFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
        imgUpload: '',
    });

    const handleChange = (e) => {
        setUpdateFormData({ ...updateformData, [e.target.name]: e.target.value });
    };

    const fetchEmployeeData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/employee/getemployeebyid/?${id}`);
            setUpdateFormData(res.data);
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/employee/updateemployee/?${id}`, updateformData);
            alert("Employee updated successfully");
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <div className="create-employee-container">
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={updateformData.name} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={updateformData.email} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input type="tel" name="mobileNo" value={updateformData.mobileNo} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                    <label>Designation:</label>
                    <select name="designation" value={updateformData.designation} onChange={handleChange} required className="select-field">
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="radio" name="gender" value="M" onChange={handleChange} required className="radio-field" /> Male
                    <input type="radio" name="gender" value="F" onChange={handleChange} required className="radio-field" /> Female
                </div>
                <div>
                    <label>Course:</label>
                    <input type="checkbox" name="course" value="MCA" onChange={handleChange} className="checkbox-field" /> MCA
                    <input type="checkbox" name="course" value="BCA" onChange={handleChange} className="checkbox-field" /> BCA
                    <input type="checkbox" name="course" value="BSC" onChange={handleChange} className="checkbox-field" /> BSC
                </div>
                <div>
                    <label>Image Upload (JPG/PNG only):</label>
                    <input type="text" name="imgUpload" accept="image/jpeg, image/png" onChange={handleChange} className="file-field" />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    )
}

export default UpdateEmployee;
