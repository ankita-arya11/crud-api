import { DataTypes, Model } from "sequelize";
import sequelize from "./db";
import { EmployeeAttributes } from "../interfaces/index.types";

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
//create table using this model