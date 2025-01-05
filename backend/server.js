import express from 'express';
import dotenv from "dotenv"; 
import { connectDB } from './config/db.js';
import blogRoutes from "./routes/blog.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
});

//bjI5A945rV0ZU65A