import express from "express";
import {sequelize} from "./config/sequelize";

const app = express();

app.use(express.json());

app.listen(4000, () => {
    console.log(`server is running on https://localhost:4000`)
})

async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("db connected successfully");
        
    } catch (error) {
        console.error("db could not connect", error);
    }
}
connectDb();