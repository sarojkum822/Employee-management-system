import Employee from '../models/employee.models.js';

export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobileNo, designation, gender, course, imgUpload } = req.body;
    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      imgUpload
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const getAllEmployee = async (req, res) => {
//   try {

//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getAllEmployee = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {}; // Case-insensitive search by name

    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;

    await Employee.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
