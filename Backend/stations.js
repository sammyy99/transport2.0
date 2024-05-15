import express from "express";
import sql from "./db.js";

const router = express.Router();

router.get('/stations/allstates',async (req,res)=>{  // get all states from SSTATE
    try {
        const result = await sql.query('SELECT STATE, SID FROM SSTATE')
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).json({message:"Internal server error: "+error})
        console.log(error)
    }
})

router.get('/stations/statestations/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const result = await sql.query(`SELECT * FROM SDIST WHERE SID = ${id}`)
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).json({message:"Internal server error: "+error})
        console.log(error)
    }
})

router.get('/stations/allstations', async (req,res)=>{
    try {
      const result = await sql.query('SELECT * FROM SDIST')
      res.status(200).json(result.recordset)
    } catch (error) {
      res.status(500).json({message:"Internal server error: "+error})
      console.log(error)
    }
})

router.get('/stations/searched/:value', async (req,res)=>{
    try {
      const searchedStation = req.params.value
      const result = await sql.query(`SELECT * FROM SDIST WHERE DISTRICT LIKE '%${searchedStation}%' ORDER BY DISTRICT`)
      res.status(200).json(result.recordset)
    } catch (error) {
      res.status(500).json({message:"Internal server error: "+error})
      console.log(error)
    }
})

export default router;