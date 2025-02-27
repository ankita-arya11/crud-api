import express, { request }  from "express";
import { EmployeeModel } from "../db/employee";

export class EmployeeController {
    
    getAllEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const employees = await EmployeeModel.findAll();
            return res.status(200).json({data: employees});
        } catch (error) {
            return res.sendStatus(400)
        }
    }

    getEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const {id} = req.params;
            const employee = await EmployeeModel.findByPk();
            return res.status(200).json({data: employee})
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    createEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const {name, email, mobile, age, joining} = req.body;
            const existingEmployee = await EmployeeModel.findOne({
                where: {email}
            });
            if(existingEmployee) {
                return res.sendStatus(404).json({message: "employee with this email already exists"});
            }

            const employee = await EmployeeModel.create ({
                    name,
                    email,
                    mobile,
                    age,
                    joining
            })
            return res.sendStatus(200).json({message: 'employee created', data: employee})
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    updateEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const {id} = req.params;
            const {name, email, mobile, age, joining} = req.body;

            const employee = await EmployeeModel.findByPk(id);

            if(!employee) {
               return res.status(404).json({message: "employee not found"})
            }
            employee.name = name,
            employee.email = email,
            employee.mobile = mobile,
            employee.age = age,
            employee.joining = joining

            await employee.save();
            return res.sendStatus(200).json({message: 'employee data updated', data: employee})
        
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    deleteEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const {id} = req.params;
            const employee = await EmployeeModel.findByPk();

            if(!employee) {
                return res.status(404).json({message: "employee not found"})
            }
            await employee.destroy();
            return res.status(200).json({message : "employee deleted succesfuly"});

        } catch (error) {
            return res.sendStatus(400);
        }
    }

}