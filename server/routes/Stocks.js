var Stocks = require('../services/Stocks');



module.exports = function(cp) {
  var me = {
    post: function(req, res, next) {
      let data = req.body;
      Stocks.exec(data,cp)
        .then(()=>{
          res.status(200).json({});
        })
        .catch(err=>{
          res.status(501).send(err||err.message);
        })
    }
  };

  return me;
};