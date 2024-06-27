import express from 'express'
import sql from './db.js'

const router = express.Router();

router.get('/accounts/print' , async(req,res)=>{
    try {
        const result = await sql.query(`SELECT WEBID, ACCNAME, STATE, DISTRICT FROM WEBID2`)
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).json({ message: "Internal server error: " + error })
        console.log(error)
    }
})

export default router
