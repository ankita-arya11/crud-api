import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

interface EmployeeAttributes {
    id?: number,
    name: string,
    email: string,
    mobile:string,
    age: number,
    joining: Date
}

export class EmployeeModel extends Model<EmployeeAttributes> implements EmployeeAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public mobile!: string;
    public age!: number;
    public joining!: Date;
}

EmployeeModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER 
    },
    joining: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
},
{
    sequelize,
    tableName: 'employees',
    modelName: 'Employee'
},

)