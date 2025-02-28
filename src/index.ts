import express from "express";
import sequelize from "./db/db";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use("/api" ,authRoutes);
const port = 4000;

async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("db connected successfully");
    
    } catch (error) {
        console.error("db could not connect", error);
    }
}
connectDb();

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})