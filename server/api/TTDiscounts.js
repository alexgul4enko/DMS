
var TTdiscountRout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/TTDiscounts')(cp);
 
  router.get('/', dbrouters.get);

 

  return router;
}




 module.exports = TTdiscountRout;