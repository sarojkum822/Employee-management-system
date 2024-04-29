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


export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findOne(employeeId);

    console.log(employee);



    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const updateData = req.body;

    console.log(updateData._id)

    await Employee.findByIdAndUpdate(updateData._id, updateData, { new: true });
    res.status(200).json(updateEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





export const deleteEmployee = async (req, res) => {
  try {
    const id  = req.query.id;

    const data = await Employee.findByIdAndDelete({_id:id});

    res.status(200).json({ message: "Employee deleted successfully", data: data });

  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

