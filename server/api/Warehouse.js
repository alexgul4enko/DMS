var sql = require('mssql');


var rout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/Warehouse')(cp);
 
  router.get('/', dbrouters.get);

  return router;
}




 module.exports = rout;
