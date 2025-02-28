import { Sequelize } from "sequelize";

export const sequelize = new Sequelize ({
    database: "mydb",
    username: "postgres",
    password: "root",
    host: "localhost",
    dialect: "postgres",
    logging: false
});



export default sequelize;