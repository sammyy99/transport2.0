import express from "express";
import cors from 'cors';
import { connectDB } from "./db.js";
import loginRouter from './login.js'
import statesRouter from './states.js';
import stationsRouter from './stations.js';

const app = express();
const port = 5000;

app.use(express.urlencoded({extended:true}))  // bodyparser
app.use(express.json())  // to get data in json
app.use(cors())  // enabling cors

connectDB(); // calling this function to connect to DB.

app.use("/", loginRouter); // Login routes
app.use("/", statesRouter); // State routes
app.use("/", stationsRouter); // Station routes

app.listen(port,()=>{
    console.log("Your server is running on port 5000.")
})

