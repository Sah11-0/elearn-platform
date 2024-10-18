import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';


import assignmentRoutes from "./routes/assignment.route.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/assignments", assignmentRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})