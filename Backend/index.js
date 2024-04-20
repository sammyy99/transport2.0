import express from "express"
import sql from "mssql"

const app = express();
const port = 5000;
const config = {
    server:'SAMMY\\SQLEXPRESS',
    database:'Transport',
    user:'localserver',
    password:'transport@123',
    options:{
        trustedConnection: true,
        trustServerCertificate: true,
    },
    
}

app.listen(port,()=>{
    console.log("Your server is running on port 5000.")
})

const connect = async ()=>{
    try {
        await sql.connect(config)
        console.log("Connection to db successfull")
    } catch (error) {
        console.log("Error in connecting to db "+error)
    }
}
connect()

app.get("/",(req,res)=>{
    res.send("Hello")
})