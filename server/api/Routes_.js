
var Routes_Rout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/Routes')(cp);
 
  router.get('/', dbrouters.get);

 

  return router;
}




 module.exports = Routes_Rout;