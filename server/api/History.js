var sql = require('mssql');


var rout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/History')(cp);
 
  router.get('/', dbrouters.get);
  router.post('/', dbrouters.post);

 

  return router;
}




 module.exports = rout;
