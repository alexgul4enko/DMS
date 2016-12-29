var Routes = require('../services/Routes');



module.exports = function(cp) {
  var me = {
    get: function(req, res, next) {
     if(req.signedCookies && req.signedCookies.UserDao && req.signedCookies.UserDao){
        let coockie = JSON.parse(req.signedCookies.UserDao)[0];
        let data = {login:coockie.UserLogin ,pass:coockie.pass};



        Routes.init(data,cp, (err,data_) =>{
        if(err){
           if(err==="empty"){
            res.status(502).send(err);
           }
           else{
            res.status(501).send(err);
           }
           
          }
          else{
            res
              .status(200)
              .json(data_);
          }
        });

      }
      else{
        res.status(401).send('coockies not found');    
      }    
    }
  };

  return me;
};