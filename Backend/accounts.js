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
    } = req.body.data; // console.log(req.body.data)

    // Helper function to handle null values
    const formatValue = (value) => (value === null || value === '' ? 'null' : `'${value}'`);
    const result = await sql.query(/*`
    DECLARE @nextWEBID INT;
    SELECT @nextWEBID = ISNULL(MAX(CAST(WEBID AS INT)), 0) + 1 FROM WEBID2;
    DECLARE @formattedWEBID VARCHAR(6);
    SET @formattedWEBID = RIGHT('000000' + CAST(@nextWEBID AS VARCHAR(6)), 6);
    INSERT INTO WEBID2 (SID, ZID, ACCTYPE, STATE, DISTRICT, LOCATION, ACCNAME, NAME, CUSTIN, ADDRESS, CSZ, CSZ1, BHI, YN, PODATE, FDATE, TDATE, DATE, LDATE, BACKYN, EWAYBILL, AUTOGRNO, MITEMYN, MULTIUSER, DEVPRINT, MBCHNO, FTLYN, BDA, MBYN, FSYN, EWBAPI, PERSON, PHOFF, PHRES, MOBILENO, FAXNO, EMAILID, DOMAIN, WEBID)
    VALUES (${SID}, ${ZID}, '${ACCTYPE}', '${STATE}', '${DISTRICT}', '${LOCATION}', '${ACCNAME}', '${NAME}', '${CUSTIN}', '${ADDRESS}', '${CSZ}', '${CSZ1}', '${BHI}', '${YN}', ${formatValue(PODATE)}, ${formatValue(FDATE)}, ${formatValue(TDATE)}, ${formatValue(DATE)}, ${formatValue(LDATE)}, '${BACKYN}', '${EWAYBILL}', '${AUTOGRNO}', '${MITEMYN}', '${MULTIUSER}', '${DEVPRINT}', '${MBCHNO}', '${FTLYN}', '${BDA}', '${MBYN}', '${FSYN}', '${EWBAPI}', '${PERSON}', '${PHOFF}', '${PHRES}', '${MOBILENO}', '${FAXNO}', '${EMAILID}', '${DOMAIN}', @formattedWEBID);
  `*/
    `INSERT INTO WEBID2 (SID, ZID, ACCTYPE, STATE, DISTRICT, LOCATION, ACCNAME, NAME, CUSTIN, ADDRESS, CSZ, CSZ1, BHI, YN, PODATE, FDATE, TDATE, DATE, LDATE, BACKYN, EWAYBILL, AUTOGRNO, MITEMYN, MULTIUSER, DEVPRINT, MBCHNO, FTLYN, BDA, MBYN, FSYN, EWBAPI, PERSON, PHOFF, PHRES, MOBILENO, FAXNO, EMAILID, DOMAIN, WEBID)
    VALUES (${SID}, ${ZID}, '${ACCTYPE}', '${STATE}', '${DISTRICT}', '${LOCATION}', '${ACCNAME}', '${NAME}', '${CUSTIN}', '${ADDRESS}', '${CSZ}', '${CSZ1}', '${BHI}', '${YN}', ${formatValue(PODATE)}, ${formatValue(FDATE)}, ${formatValue(TDATE)}, ${formatValue(DATE)}, ${formatValue(LDATE)}, '${BACKYN}', '${EWAYBILL}', '${AUTOGRNO}', '${MITEMYN}', '${MULTIUSER}', '${DEVPRINT}', '${MBCHNO}', '${FTLYN}', '${BDA}', '${MBYN}', '${FSYN}', '${EWBAPI}', '${PERSON}', '${PHOFF}', '${PHRES}', '${MOBILENO}', '${FAXNO}', '${EMAILID}', '${DOMAIN}', ${`(SELECT format(MAX(WEBID)+1,'000000') FROM WEBID2)`});`
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
    // Helper function to handle null values
    const formatValue = (value) => (value === null || value === '' ? 'null' : `'${value}'`);
    const result =await sql.query(`UPDATE WEBID2
    SET SID = ${SID},
    ZID = ${ZID},
    ACCTYPE = '${ACCTYPE}',
    STATE = '${STATE}',
    DISTRICT = '${DISTRICT}',
    LOCATION = '${LOCATION}',
    ACCNAME = '${ACCNAME}',
    NAME = '${NAME}',
    CUSTIN = '${CUSTIN}',
    ADDRESS = '${ADDRESS}',
    CSZ = '${CSZ}',
    CSZ1 = '${CSZ1}',
    BHI = '${BHI}',
    YN = '${YN}',
    PODATE = ${formatValue(PODATE)},
    FDATE = ${formatValue(FDATE)},
    TDATE = ${formatValue(TDATE)},
    DATE = ${formatValue(DATE)},
    LDATE = ${formatValue(LDATE)},
    BACKYN = '${BACKYN}',
    EWAYBILL = '${EWAYBILL}',
    AUTOGRNO = '${AUTOGRNO}',
    MITEMYN = '${MITEMYN}',
    MULTIUSER = '${MULTIUSER}',
    DEVPRINT = '${DEVPRINT}',
    MBCHNO = '${MBCHNO}',
    FTLYN = '${FTLYN}',
    BDA = '${BDA}',
    MBYN = '${MBYN}',
    FSYN = '${FSYN}',
    EWBAPI = '${EWBAPI}',
    PERSON = '${PERSON}',
    PHOFF = '${PHOFF}',
    PHRES = '${PHRES}',
    MOBILENO = '${MOBILENO}',
    FAXNO = '${FAXNO}',
    EMAILID = '${EMAILID}',
    DOMAIN = '${DOMAIN}'
    WHERE WEBID = ${WEBID};`)
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
