

var rout = function (cp){
  const router = require('express').Router();
  const dbrouters = require('../routes/MyUsers')(cp);
  router.get('/', dbrouters.get);
  return router;
}




 module.exports = rout;