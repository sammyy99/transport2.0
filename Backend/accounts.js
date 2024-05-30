import express from 'express'
import sql from './db.js'

const router = express.Router();

router.get('/accounts/allaccounts/:value',async (req,res)=>{
    try {
        const orderBy = req.params.value
        const result = await sql.query(`SELECT * FROM WEBID2 ORDER BY '${orderBy}'`)
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
      const result = await sql.query(`SELECT * FROM WEBID2 WHERE ${searchBy} LIKE '%${searchedValue}%' ORDER BY '${searchBy}'`)
      res.status(200).json(result.recordset)
    } catch (error) {
      res.status(500).json({message:"Internal server error: "+error})
      console.log(error)
    }
})

router.get("/accounts/getstates",async (req,res)=>{  // to get all states
  try {
      const dbresponse = await sql.query(`Select * from SSTATE`);
      res.json(dbresponse.recordset)
  } catch (error) {
      res.status(500).json({message:"Internal server error (Getting states from db failed)",err:error})
      console.log(error)
  }  
})

router.get("/accounts/getstations/:id",async (req,res)=>{  // to get all states
  try {
      const sid = req.params.id
      const dbresponse = await sql.query(`Select * from SDIST where SID = ${sid}`);
      res.json(dbresponse.recordset)
  } catch (error) {
      res.status(500).json({message:"Internal server error (Getting stations from db failed)",err:error})
      console.log(error)
  }  
})

router.post("/accounts/validation/station",async (req,res)=>{  // to validate station
  try {
    const {sid, zid} = req.body
    const result = await sql.query(`select * from SDIST where SID = ${sid} AND ZID = ${zid}`)
    if (result.recordset.length > 0) {
      res.status(200).json({ msg: "✅ Right station selected", alert: true})
    } else{
      res.status(200).json({msg: "Wrong Station selected, please select Station which is in respective State", alert: false})
    }
  } catch (error) {
    res.status(500).json({message:"Internal server error (Getting station validation from db failed)",err:error})
    console.log(error)
  }
})

router.post("/accounts/validation/accountname",async (req,res)=>{  // to validate account name 
  try {
    const {name, webid} = req.body;
    const result = await sql.query(`select * from WEBID2 where ACCNAME = '${name}' and WEBID != ${webid}`)
    if (result.recordset.length>0) {
      res.status(200).json({msg: "Account name already exist, use different name", alert:false, nameValid:false})
    } else {
      res.status(200).json({msg: "Valid Account name", alert:true, nameValid:true})
    }
  } catch (error) {
    res.status(500).json({message:"Internal server error (Getting account validation from db failed)",err:error})
    console.log(error)
  }
})


export default router;