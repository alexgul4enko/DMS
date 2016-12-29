var Warehouse = require('../services/Warehouse');



module.exports = function(cp) {
  var me = {
    get: function(req, res, next) {
      if(req.signedCookies && req.signedCookies.UserDao && req.signedCookies.UserDao){
        let coockie = JSON.parse(req.signedCookies.UserDao)[0];
        let data = {login:coockie.UserLogin ,pass:coockie.pass};

        Warehouse.exec(data,cp)
          .then(data_=>{
            res.status(200).json(data_);
          })
          .catch(err=>{
            res.status(501).send(err);
          })

      }
      else{
        res.status(401).send('coockies not found');    
      }
     
    }
  };

  return me;
};