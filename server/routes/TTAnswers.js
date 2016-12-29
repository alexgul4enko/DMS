var TTAnswers = require('../services/TTAnswers');



module.exports = function(cp) {
  var me = {
    post: function(req, res, next) {
      let data = req.body;
      TTAnswers.exec(data,cp)
        .then(()=>{
          res.status(200).json({});
        })
        .catch(err=>{
          res.status(501).send(err);
        })
    }
  };

  return me;
};