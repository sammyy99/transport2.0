import express from 'express'
import sql from './db.js'

const router = express.Router();

router.get('/accounts/allaccounts/:value', async (req, res) => {
  try {
    const orderBy = req.params.value
    const result = await sql.query(`SELECT * FROM WEBID2 ORDER BY '${orderBy}'`)
    res.status(200).json(result.recordset)
  } catch (error) {
    res.status(500).json({ message: "Internal server error: " + error })
    console.log(error)
  }
})

router.post('/accounts/searchaccounts', async (req, res) => {
  try {
    const searchedValue = req.body.searchedValue;
    const searchBy = req.body.searchBy;
    const result = await sql.query(`SELECT * FROM WEBID2 WHERE ${searchBy} LIKE '%${searchedValue}%' ORDER BY '${searchBy}'`)
    res.status(200).json(result.recordset)
  } catch (error) {
    res.status(500).json({ message: "Internal server error: " + error })
    console.log(error)
  }
})

router.get("/accounts/getstates", async (req, res) => {  // to get all states
  try {
    const dbresponse = await sql.query(`Select * from SSTATE`);
    res.json(dbresponse.recordset)
  } catch (error) {
    res.status(500).json({ message: "Internal server error (Getting states from db failed)", err: error })
    console.log(error)
  }
})

router.get("/accounts/getstations/:id", async (req, res) => {  // to get all states
  try {
    const sid = req.params.id
    const dbresponse = await sql.query(`Select * from SDIST where SID = ${sid}`);
    res.json(dbresponse.recordset)
  } catch (error) {
    res.status(500).json({ message: "Internal server error (Getting stations from db failed)", err: error })
    console.log(error)
  }
})

router.post("/accounts/validation/station", async (req, res) => {  // to validate station
  try {
    const { sid, zid } = req.body
    const result = await sql.query(`select * from SDIST where SID = ${sid} AND ZID = ${zid}`)
    if (result.recordset.length > 0) {
      res.status(200).json({ msg: "✅ Right station selected", alert: true })
    } else {
      res.status(200).json({ msg: "Wrong Station selected, please select Station which is in respective State", alert: false })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error (Getting station validation from db failed)", err: error })
    console.log(error)
  }
})

router.post("/accounts/validation/accountname", async (req, res) => {  // to validate account name 
  try {
    const { name, webid } = req.body;
    const result = await sql.query(`select * from WEBID2 where ACCNAME = '${name}' and WEBID != ${webid}`)
    if (result.recordset.length > 0) {
      res.status(200).json({ msg: "Account name already exist, use different name", alert: false, nameValid: false })
    } else {
      res.status(200).json({ msg: "Valid Account name", alert: true, nameValid: true })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error (Getting account validation from db failed)", err: error })
    console.log(error)
  }
})

router.post("/accounts/add/submit", async (req, res) => {  // saving FormRecord on Adding
  try {
    const {
      WEBID,
      SID,
      ZID,
      ACCTYPE,
      STATE,
      DISTRICT,
      LOCATION,
      ACCNAME,
      NAME,
      CUSTIN,
      ADDRESS,
      CSZ,
      CSZ1,
      BHI,
      YN,
      PODATE,
      FDATE,
      TDATE,
      DATE,
      LDATE,
      BACKYN,
      EWAYBILL,
      AUTOGRNO,
      MITEMYN,
      MULTIUSER,
      DEVPRINT,
      MBCHNO,
      FTLYN,
      BDA,
      MBYN,
      FSYN,
      EWBAPI,
      PERSON,
      PHOFF,
      PHRES,
      MOBILENO,
      FAXNO,
      EMAILID,
      DOMAIN
    } = req.body.data; console.log(req.body.data)

    // Helper function to handle null values
    const formatValue = (value) => (value === null || value === '' ? 'null' : `'${value}'`);
    const result = await sql.query(`INSERT INTO WEBID2 (SID,ZID,ACCTYPE,STATE,DISTRICT,LOCATION,ACCNAME,NAME,CUSTIN,ADDRESS,CSZ,CSZ1,BHI,YN,PODATE,FDATE,TDATE,DATE,LDATE,BACKYN,EWAYBILL,AUTOGRNO,MITEMYN,MULTIUSER,DEVPRINT,MBCHNO,FTLYN,BDA,MBYN,FSYN,EWBAPI,PERSON,PHOFF,PHRES,MOBILENO,FAXNO,EMAILID,DOMAIN,WEBID)
                                                VALUES (${SID},${ZID},'${ACCTYPE}','${STATE}','${DISTRICT}','${LOCATION}','${ACCNAME}','${NAME}','${CUSTIN}','${ADDRESS}','${CSZ}','${CSZ1}','${BHI}','${YN}',${formatValue(PODATE)},${formatValue(FDATE)},${formatValue(TDATE)},${formatValue(DATE)},${formatValue(LDATE)},'${BACKYN}','${EWAYBILL}','${AUTOGRNO}','${MITEMYN}','${MULTIUSER}','${DEVPRINT}','${MBCHNO}','${FTLYN}','${BDA}','${MBYN}','${FSYN}','${EWBAPI}','${PERSON}','${PHOFF}','${PHRES}','${MOBILENO}','${FAXNO}','${EMAILID}','${DOMAIN}',(SELECT MAX(WEBID) + 1 FROM WEBID2))`
                                  )
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: "✅ Account saved successfully", alert: true });
    } else {
      res.status(200).json({ msg: "🚫 No account records were saved", alert: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error (Adding data to DB failed)", err: error });
    console.log(error);
  }
});


router.post("/accounts/edit/submit", async (req, res) => {   // Saving formRecord on Editing
  try {
    const {
      WEBID,
      SID,
      ZID,
      ACCTYPE,
      STATE,
      DISTRICT,
      LOCATION,
      ACCNAME,
      NAME,
      CUSTIN,
      ADDRESS,
      CSZ,
      CSZ1,
      BHI,
      YN,
      PODATE,
      FDATE,
      TDATE,
      DATE,
      LDATE,
      BACKYN,
      EWAYBILL,
      AUTOGRNO,
      MITEMYN,
      MULTIUSER,
      DEVPRINT,
      MBCHNO,
      FTLYN,
      BDA,
      MBYN,
      FSYN,
      EWBAPI,
      PERSON,
      PHOFF,
      PHRES,
      MOBILENO,
      FAXNO,
      EMAILID,
      DOMAIN
    } = req.body.data;
    
    const query = `
      UPDATE WEBID2 SET
        ACCNAME = @ACCNAME, ADDRESS = @ADDRESS, BACKYN = @BACKYN, BDA = @BDA, BHI = @BHI, CUSTIN = @CUSTIN, CSZ = @CSZ, CSZ1 = @CSZ1, DATE = @DATE, DEVPRINT = @DEVPRINT, DISTRICT = @DISTRICT, DOMAIN = @DOMAIN, EMAILID = @EMAILID, EWAYBILL = @EWAYBILL, EWBAPI = @EWBAPI, FAXNO = @FAXNO, FDATE = @FDATE, FSYN = @FSYN, FTLYN = @FTLYN, LOCATION = @LOCATION, LDATE = @LDATE, MITEMYN = @MITEMYN, MBCHNO = @MBCHNO, MBYN = @MBYN, MULTIUSER = @MULTIUSER, MOBILENO = @MOBILENO, NAME = @NAME, PERSON = @PERSON, PHOFF = @PHOFF, PHRES = @PHRES, PODATE = @PODATE, SID = @SID, STATE = @STATE, TDATE = @TDATE, YN = @YN, ZID = @ZID, ACCTYPE = @ACCTYPE, AUTOGRNO = @AUTOGRNO
      WHERE WEBID = @WEBID
    `;
    
    const result = await sql.query({
      query,
      params: {
        ACCNAME, ADDRESS, BACKYN, BDA, BHI, CUSTIN, CSZ, CSZ1, DATE, DEVPRINT, DISTRICT, DOMAIN, EMAILID, EWAYBILL, EWBAPI, FAXNO, FDATE, FSYN, FTLYN, LOCATION, LDATE, MITEMYN, MBCHNO, MBYN, MULTIUSER, MOBILENO, NAME, PERSON, PHOFF, PHRES, PODATE, SID, STATE, TDATE, YN, ZID, ACCTYPE, AUTOGRNO, WEBID
      }
    });
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: "✅ Account updated successfully", alert: true });
    } else {
      res.status(200).json({ msg: "🚫 No account records were saved", alert: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error (Updating data in DB failed)", err: error });
    console.log(error);
  }
});


export default router;
