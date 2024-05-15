import express from 'express'
import sql from './db.js'

const router = express.Router();

router.post("/login",async (req,res)=>{  // user table user fetch
    const data = await req.body
    const db = await sql.query('SELECT username, userpwd from usertable')
    const dbData = db.recordset[0]

    if (data.username === dbData.username && data.password === dbData.userpwd) {
        res.status(200).json({success:true,message:"Login in successful"})
    } else {
        res.status(401).json({success:false,message:"Invalid Username or Password"})
    }
})


export default router