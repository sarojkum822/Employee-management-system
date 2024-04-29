import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { createEmployee, deleteEmployee, getAllEmployee, getEmployeeById, updateEmployee } from '../controllers/employee.controller.js';

const router = express.Router();

router.post("/createemployee",createEmployee);
router.get("/getallemployee",getAllEmployee);
router.get("/getemployeebyid",getEmployeeById);

router.put("/updateemployee",updateEmployee);

router.delete("/deleteemployee",deleteEmployee);

export default router;