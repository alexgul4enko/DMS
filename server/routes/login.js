var loginModule = require('../services/login');



module.exports = function(cp) {
  var me = {
    post: function(req, res, next) {

      loginModule.check(req.body,cp)
        .then(data_=>{
          res
            .status(200)
            .cookie('UserDao', JSON.stringify([data_]), { signed: true , maxAge:60 * 1000*60*24*150})
            .json(data_);
        })
        .catch(err=>{
          res.status(err==="empty"?401:501).send(err);
        })
    }
  };

  return me;
};