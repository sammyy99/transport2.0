import express, { json } from "express"
import sql from "mssql"
import cors from 'cors'

const app = express();
const port = 5000;
const config = {
    server:'SAMMY\\SQLEXPRESS',
    database:'soluti14_transport',
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
//---------------------------------------------------------------Login-----------------------------------------------------------------------
app.post("/login",async (req,res)=>{  // user table user fetch
    const data = await req.body
    const db = await sql.query('SELECT username, userpwd from usertable')
    const dbData = db.recordset[0]

    if (data.username === dbData.username && data.password === dbData.userpwd) {
        res.status(200).json({success:true,message:"Login in successful"})
    } else {
        res.status(401).json({success:false,message:"Invalid Username or Password"})
    }
})
//---------------------------------------------------------------Login-----------------------------------------------------------------------

//---------------------------------------------------------------States-----------------------------------------------------------------------
app.get("/state/:id",async (req,res)=>{
        const id =await req.params.id
    try {
        const dbState = await sql.query(`Select * from SSTATE where SID =${id}`);
        const dbCount = await sql.query(`select count(*) as record_count from SSTATE`)
        const dbData = {state:dbState.recordset, count: dbCount.recordset}
        res.json(dbData)
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting states from db failed)",err:error})
        console.log(error)
    }  
})  

app.get("/state/searchState/:search",async (req,res)=>{
    const searchedState = req.params.search
    console.log(searchedState)
    try {
        const dbStates = await sql.query(`SELECT * FROM SSTATE WHERE STATE LIKE '%${searchedState}%'`)
        const dbdata = await dbStates.recordset
        res.json(dbdata)
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting searched states from db failed)",err:error})
        console.log(error)
    }
})

app.post("/addstate/check",(req,res)=>{
       const body = req.body
       console.log(body)
})

app.post("/addsname/check",(req,res)=>{

})

//---------------------------------------------------------------States-----------------------------------------------------------------------

app.get("/stations",async (req,res)=>{
    try {
        const db = await sql.query('Select * from SDIST')
        const dbData = await db.recordset
        res.json(dbData)
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting stations from db failed)",err:error})
        console.log(error)
    }  
})

app.get("/accounts",async (req,res)=>{
    try {
        const db = await sql.query('Select * from WEBID')
        const dbData = await db.recordset
        res.json(dbData)
    } catch (error) {
        res.status(500).json({message:"Internal server error(Getting accounts from db failed)",err:error})
        console.log(error)
    }
})