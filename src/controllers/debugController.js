const globalConstants = require('../constants/GlobalContants.js');
const DebugDB = require('../models/debugDB.js');
const debugDB = new DebugDB();

const createQuery = (req, res) => {
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sqlCode = req.body.sqlCode;
    debugDB.setQueryCode(sqlCode, function(error, result){
        if (error){
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        }
        else{
            res.json({
                message: result,
                status: globalConstants.STATUS_CODES.SUCCESS_CODE
            });
        }
    });
}

module.exports = {createQuery}