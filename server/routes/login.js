var loginModule = require('../services/login');

module.exports = function(cp) {
  var me = {
    post: function(req, res, next) {
      loginModule.check(req.body,cp)
        .then(data_=>{
          res
            .status(200)
            .cookie('UserDao', JSON.stringify(data_), { signed: true , maxAge:60 * 1000*60*24*150})
            .json(data_);
        })
        .catch(err=>{
          res.status(err==="empty"?401:501).send(err);
        })
    },
    get:(req, res)=>{
      const {UserLogin : login ,pass} = JSON.parse(req.signedCookies && req.signedCookies.UserDao ||'{}');
      let userdata;
      loginModule.check({login ,pass},cp)
        .then(data_=>{
          return loginModule.getRights(data_,cp)
        })
        .then(full=>{
          res.status(200).json(full);
        })
        .catch(err=>{
          res.status(err==="empty"?401:501).send(err);
        })
    }
  };

  return me;
};