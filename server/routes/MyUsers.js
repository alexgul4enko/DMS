var MyUsers = require('../services/MyUsers');



module.exports = cp=>{
  return {
    get:(req, res, next)=>{
      if(req.signedCookies && req.signedCookies.UserDao && req.signedCookies.UserDao){
        let coockie = JSON.parse(req.signedCookies.UserDao);
        let data = {login:coockie.UserLogin ,pass:coockie.pass, id : coockie.ID};
        MyUsers.get(data,cp)
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
    }
   
  }
}