var sql = require('mssql');


var rout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/History')(cp);
 
  router.get('/', dbrouters.get);

 

  return router;
}




 module.exports = rout;
