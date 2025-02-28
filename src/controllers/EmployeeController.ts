import { NextFunction, Request, Response } from "express";
import { EmployeeModel } from "../db/employee.model";
import { Op } from "sequelize";

export const createEmployee = async (req: Request, res: Response) : Promise<any>=> {
    try {
        const { name, email, mobile, age, joining } = req.body;

   
    
        if (!name || !email || !mobile || !age || !joining) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (typeof age !== "number" || isNaN(age) || age < 0) {
            return res.status(400).json({ message: "Age must be a valid number" });
        }

        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ message: "Invalid mobile number" });
        }

        if (isNaN(Date.parse(joining))) {
            return res.status(400).json({ message: "Invalid joining date" });
        }

        // Query to check if email or mobile exists in a single database call
        const existingEmployee = await EmployeeModel.findOne({
            where: {
                email,
            },
        });

        const existingMobile = await EmployeeModel.findOne({
            where: {
                mobile,
            },
        });

        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }

        if (existingMobile) {
            return res.status(400).json({ message: "Employee with this mobile already exists" });
        }

        const employee = await EmployeeModel.create({
            name,
            email,
            mobile,
            age,
            joining,
        });

        console.log(employee, "Employee created successfully");
        return res.status(201).json({ message: "Employee created", data: employee });

    } catch (error) {
        console.error(error);
      
            return res.status(500).json({ message: "Internal Server Error" });
        
    }
};



export const getEmployee = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const employee = await EmployeeModel.findByPk(id);
      if (!employee) {
           res.status(404).json({ message: "Employee not found" });
      }
       res.status(200).json({
        message: "Employee details fetched successfully",
        data: employee,
      });
    } catch (error) {
       res.status(500).json({ message: "Could not retrieve data" });
      }
  };
  
  
  export const getAllEmployee = async (req: Request, res: Response) => {
      try {
        const employees = await EmployeeModel.findAll();
  
        if(!employees) {
          res.status(404).json({message: "No employees found"})
        }
        res.status(200).json({
          message: "Employees fetched successfully",
          data: employees,
        });
      } catch (error) {
        res.status(500).json({ message: "Could not retrieve employees" });
      }
  };
    
  
  export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, age, joining } = req.body;

        const employee = await EmployeeModel.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const existingEmail = await EmployeeModel.findOne({
            where: { email, id: { [Op.ne]: id } } 
        });
        if (existingEmail) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }

        const existingMobile = await EmployeeModel.findOne({
            where: { mobile, id: { [Op.ne]: id } } 
        });
        if (existingMobile) {
            return res.status(400).json({ message: "Employee with this mobile number already exists" });
        }

        await EmployeeModel.update(
            { name, email, mobile, age, joining },
            { where: { id } }
        );

        const updatedEmployee = await EmployeeModel.findByPk(id);

        return res.status(200).json({ message: "Employee data updated", data: updatedEmployee });
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

  
  
  
  export const deleteEmployee = async (req:Request, res:Response) => {
          try {
              const {id} = req.params;
              const employee = await EmployeeModel.findByPk(id);
              if(!employee){
  
                  res.status(404).json({message: "employee not found"})
              }
              if(employee) {
                  await employee.destroy();
                  res.status(200).json({message : "employee deleted succesfuly"});
              }
  
          } catch (error) {
               res.status(400).json({message: "user could not get deleted"});
          }
  };
  
  
  