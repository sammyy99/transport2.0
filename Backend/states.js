import express from "express";
import sql from "./db.js";

const router = express.Router();

router.get("/allstate",async (req,res)=>{  // to get all states
    try {
        const dbresponse = await sql.query(`Select * from SSTATE`);
        res.json(dbresponse.recordset)
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting states from db failed)",err:error})
        console.log(error)
    }  
})  

router.get("/state/searchState/:search",async (req,res)=>{  // for getting searched states
    const searchedState = req.params.search
    //console.log(searchedState)
    try {
        if (searchedState === '') {
            const dbStates = await sql.query(`SELECT * FROM SSTATE ORDER BY STATE`)
            const dbdata = await dbStates.recordset
            res.json(dbdata)
        } else {
            const dbStates = await sql.query(`SELECT * FROM SSTATE WHERE STATE LIKE '%${searchedState}%' ORDER BY STATE`)
            const dbdata = await dbStates.recordset
            res.json(dbdata)
        }
        
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting searched states from db failed)",err:error})
        console.log(error)
    }
})

router.delete("/state/delete/:id",async (req,res)=>{  // for delete handle
    const sid = req.params.id
    console.log(sid)
    try {
        const dbDistrict = await sql.query(`SELECT DISTRICT from SDIST WHERE SID =${sid}`)
        console.log(dbDistrict.recordset)
        if (dbDistrict.recordset.length>0) {
            res.json({msg:"🚫 District exist. State cannot be deleted.",alert:false})
        } else {
            await sql.query(`DELETE FROM SSTATE WHERE SID = ${sid}`)
            res.json({msg:"✅ Successfully deleted",alert:true})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error (Getting searched states from db failed)",err:error})
        console.log(error)
    }
})

router.post("/state/addEdit/check",async (req,res)=>{  // add or edit check handle

    try {
        const data = req.body
        console.log(data)
        if (data.typeOf === 'state') {
            try {
                const dbresponse = await sql.query(`SELECT STATE FROM SSTATE WHERE STATE = '${data.name}' AND SID != ${data.localSid}`)
                const dbdata = await dbresponse.recordset
                if (dbdata.length>0) {
                    res.json({msg:"🚫 State already exist",allowed:false})
                } else {
                    res.json({msg:"✅ Valid State",allowed:true})
                }
              } catch (error) {
                res.status(500).json({message:"Internal server error (Error in checking this state name)",err:error})
                console.log(error)
              }

        }else if (data.typeOf === 'scode') {
            try {
                const dbresponse = await sql.query(`SELECT SNAME FROM SSTATE WHERE SNAME = '${data.sname}' AND SID != ${data.localSid}`)
                const dbdata = await dbresponse.recordset
                if (dbdata.length>0) {
                    res.json({msg:"🚫 Statecode already exist",allowed:false})
                } else {
                    res.json({msg:"✅ Valid Statecode",allowed:true})
                }
              } catch (error) {
                res.status(500).json({message:"Internal server error (Error in checking this state code)",err:error})
                console.log(error)
              }
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error (Error in checking this state data)",err:error})
        console.log(error)
    }
       
})

router.post('/state/add/save',async(req,res)=>{  // save handle for add
     try {
        const body = req.body
        const dbresponse = await sql.query(`INSERT INTO SSTATE (STATE, SNAME, SID)
                                            OUTPUT INSERTED.ID
                                             VALUES ('${body.state}', '${body.sname}', (SELECT MAX(SID) + 1 FROM SSTATE))`);
        if (dbresponse.recordset[0].ID !== 0) {
            res.status(200).json({msg:"✅ State added successfully",alert:true})
        } else {
            res.status(200).json({msg:"❕ Something went wrong",alert:false})
        }
     } catch (error) {
        res.status(500).json({message:"Internal server error (Error in saving this state data)",err:error})
        console.log(error)
     }
})

router.post('/state/edit/save',async(req,res)=>{  // save handle for edit
    try {
        const body = req.body
        const dbresponse = await sql.query(`UPDATE SSTATE 
                                            SET STATE = '${body.state}', SNAME = '${body.sname}' 
                                            WHERE SID = ${body.sid}`);
        if (dbresponse.rowsAffected[0] > 0) {
            res.status(200).json({ msg: "✅ State updated successfully",alert:true});
        } else {
            res.status(200).json({ msg: "❕ No records were updated",alert:false});
        } 
    } catch (error) {
        res.status(500).json({message:"Internal server error (Error in saving this state data)",err:error})
        console.log(error)
    }
})


export default router;