import express from "express"
import sql from "mssql"
import cors from 'cors'

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

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

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

app.post("/login",async (req,res)=>{
    const data = await req.body
    const db = await sql.query('SELECT username, userpwd from usertable')
    const dbData = db.recordset[0]

    if (data.username === dbData.username && data.password === dbData.userpwd) {
        res.status(200).json({success:true,message:"Login in successful"})
    } else {
        res.status(401).json({success:false,message:"Invalid Username or Password"})
    }
})