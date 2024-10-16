import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import assignmentRoutes from "./routes/assignment.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/assignments", assignmentRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:5004");
})