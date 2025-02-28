import { EmployeeModel } from "../db/employee.model";

export interface EmployeeAttributes {
    id?: number,
    name: string,
    email: string,
    mobile:string,
    age: number,
    joining: Date
}

// export interface EmployeeResponse {
//     message: string;
//     data: Partial<EmployeeAttributes>;
    
// }
