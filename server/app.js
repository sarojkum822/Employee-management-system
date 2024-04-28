import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.js'
import employeeRouter from './routes/employee.js'

import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';


dotenv.config();

export const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));



app.use("/api/v1/users",userRouter);
app.use("/api/v1/employee",employeeRouter);


app.get('/', (req, res) => {
    res.send("form test");
})

app.use(errorMiddleware);


