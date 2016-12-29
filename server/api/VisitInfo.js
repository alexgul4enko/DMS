var sql = require('mssql');


var rout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/VisitInfo')(cp);
 
  router.post('/', dbrouters.post);

  return router;
}




 module.exports = rout;
