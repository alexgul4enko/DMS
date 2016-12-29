
var TTPatFormsRout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/TTPayForms')(cp);
 
  router.get('/', dbrouters.get);

 

  return router;
}




 module.exports = TTPatFormsRout;