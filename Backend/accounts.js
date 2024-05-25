import express from 'express'
import sql from './db.js'

const router = express.Router();

router.get('/accounts/allaccounts/:value',async (req,res)=>{
    try {
        const orderBy = req.params.value
        const result = await sql.query(`SELECT * FROM SWEBID ORDER BY '${orderBy}'`)
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).json({message:"Internal server error: "+error})
        console.log(error)
    }
})

router.post('/accounts/searchaccounts', async (req,res)=>{
    try {
      const searchedValue = req.body.searchedValue;
      const searchBy = req.body.searchBy;
      const result = await sql.query(`SELECT * FROM SWEBID WHERE ${searchBy} LIKE '%${searchedValue}%' ORDER BY '${searchBy}'`)
      res.status(200).json(result.recordset)
    } catch (error) {
      res.status(500).json({message:"Internal server error: "+error})
      console.log(error)
    }
})

export default router;