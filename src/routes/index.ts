import express from 'express';
import { EmployeeController } from '../controllers/EmployeeController';

const router = express.Router();
const employee = new EmployeeController();

router.get('/employees', employee.getAllEmployee);
router.get('/employee/:id', employee.getEmployee);
router.post('/create-employee', employee.createEmployee);
router.put('/update-employee/:id', employee.updateEmployee);
router.delete('/delete-employee/:id', employee.deleteEmployee);

export default router;
