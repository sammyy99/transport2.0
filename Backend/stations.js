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

router.post('/stations/add/save',async(req,res)=>{  // save handle for add
    try {
        const body = req.body
        //console.log(body)
        const result = await sql.query(`SELECT * from SDIST WHERE DISTRICT = '${body.station}' AND SID = ${body.sid}`)
        if (result.recordset.length > 0) {
            res.status(200).json({ msg: "🚫 Station already exist", alert: false })
        } else {
            const dbresponse = await sql.query(`INSERT INTO SDIST (STATE, DISTRICT, SID, ZID)
                                           OUTPUT INSERTED.ID
                                            VALUES ('${body.state}', '${body.station}','${body.sid}' , (SELECT MAX(ZID) + 1 FROM SDIST))`);
            if (dbresponse.recordset[0].ID !== 0) {
                res.status(200).json({ msg: "✅ State added successfully", alert: true })
            } else {
                res.status(200).json({ msg: "❕ Something went wrong", alert: false })
            }
        }

    } catch (error) {
       res.status(500).json({message:"Internal server error (Error in saving this state data)",err:error})
       console.log(error)
    }
})

router.post('/stations/edit/save',async(req,res)=>{
    try {
        const body = req.body
        console.log(body)
        const result = await sql.query(`SELECT * from SDIST WHERE DISTRICT = '${body.station}' AND SID = ${body.sid}`)
        if (result.recordset.length>0) {
            res.status(200).json({ msg: "🚫 This station already exist in this state", alert: false })
        } else {
            const response = await sql.query(`UPDATE SDIST
                SET STATE = '${body.state}',
                DISTRICT = '${body.station}',
                SID = ${body.sid}
                WHERE ZID = ${body.zid};`)
                if (response.rowsAffected[0] > 0) {
                    res.status(200).json({ msg: "✅ Station updated successfully",alert:true});
                } else {
                    res.status(200).json({ msg: "❕ No records were updated",alert:false});
                } 
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error (Error in saving this state data)",err:error})
       console.log(error)
    }
})



router.delete("/stations/delete/:id",async (req,res)=>{  // for delete handle
    const zid = req.params.id
    //console.log(zid)
    try {
        const result = await sql.query(`SELECT * from WEBID WHERE ZID =${zid}`)
        console.log(result.recordset)
        if (result.recordset.length>0) {
            res.json({msg:"🚫 Account exist. Station cannot be deleted.",alert:false})
        } else {
            await sql.query(`DELETE FROM SDIST WHERE ZID = ${zid}`)
            res.json({msg:"✅ Successfully deleted",alert:true})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting searched states from db failed)",err:error})
        console.log(error)
    }
})

export default router;