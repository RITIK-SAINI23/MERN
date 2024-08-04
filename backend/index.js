//Packages
import path from 'path';
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoute.js';

//utils
import connectDB from "./config/db.js"

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

// Config app
const app = express();

app.use(express.json()); 
// this  middlewares is needed to add requestbody to request objecct and responce object (req,res)

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routing 
app.use("/api/users", userRoutes) // use(path,route) 

app.listen(port, () => console.log(`Server is connected to port http://localhost:${port}`));
