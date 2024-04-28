import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '../controllers/employee.controller.js';

const router = express.Router();

router.post("/createemployee",createEmployee);
router.get("/getallemployee",getAllEmployee);
router.put("/updateemployee",updateEmployee);
router.delete("/deleteemployee",deleteEmployee);

export default router;