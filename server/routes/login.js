var loginModule = require('../services/login');



module.exports = function(cp) {
  var me = {
    post: function(req, res, next) {
     

      loginModule.check(req.body,cp, (err,data_) =>{
        if(err){
           if(err==="empty"){
            res.status(401).send(err);
           }
           else{

            res.status(501).send(err);
           }
           
        }
        else{
          res
            .status(200)
            .cookie('UserDao', JSON.stringify(data_), { signed: true , maxAge:60 * 1000*60*24*31})
            .json(data_);
            console.log(data_)
        }
      });

    
    }
  };

  return me;
};