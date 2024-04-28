import React, { useState } from 'react';
import axios from 'axios';
import '../styles/createemployee.css'

const CreateEmployeeForm = () => {
    const [employee, setEmployee] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
        imgUpload: '',
    });



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/employee/createemployee", formData);
            console.log(res.data);
            setEmployee(res.data);
            setFormData({
                name: '',
                email: '',
                mobileNo: '',
                designation: '',
                gender: '',
                course: '',
                imgUpload: '',
            });
            alert("Employee added Successfully")
            if (res.status === 201) {
                history.push('/home'); // Navigate to home page
            }


        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    

   

    return (
        <div className="create-employee-container">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                    <label>Designation:</label>
                    <select name="designation" value={formData.designation} onChange={handleChange} required className="select-field">
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
                    <input type="file" name="imgUpload" accept="image/jpeg, image/png" onChange={handleChange} className="file-field" />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default CreateEmployeeForm;
