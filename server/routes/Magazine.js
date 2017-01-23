var Magazine = require('../services/Magazine');



module.exports = cp=>{
  return {
    get:(req, res, next)=>{
      if(req.signedCookies && req.signedCookies.UserDao && req.signedCookies.UserDao){
        let coockie = JSON.parse(req.signedCookies.UserDao)[0];
        let data = {login:coockie.UserLogin ,pass:coockie.pass};
        Magazine.get(data,cp)
          .then(data_=>{
            res.status(200).json(data_);
          })
          .catch(err=>{
              res.status(err==="empty"?502:501).send(err);
          })
      }
      else{
        res.status(401).send('coockies not found'); 
      }
    },
    post:(req, res, next)=>{
      if(req.body && req.body.user && req.body.pass){
        let data = {login:req.body.user ,pass:req.body.pass};
        Magazine.get(data,cp)
          .then(data_=>{
            res.status(200).json(data_);
          })
          .catch(err=>{
              if(err=='empty'){
                res.status(200).json([]);
              }
              else{
                 res.status(501).send(err||err.message);
              }
          })
      }
      else{
        res.status(401).send('coockies not found'); 
      }
    }
  }
}