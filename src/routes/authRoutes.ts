import express, { Router } from "express";
import { createEmployee, deleteEmployee, getAllEmployee, getEmployee, updateEmployee } from "../controllers/EmployeeController";

const router: Router = express.Router();

router.post("/create-employee", createEmployee);
router.get("/employee/:id", getEmployee);
router.get("/employees", getAllEmployee);
router.put("/update-employee/:id", updateEmployee);
router.delete("/delete-employee/:id", deleteEmployee);

export default router;
