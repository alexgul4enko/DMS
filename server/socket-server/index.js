var  io  = require('socket.io') ;
var cookieParser = require('socket.io-cookie-parser');
var crypto = require('crypto');
var data = require('../../properties.js');
var actions = require ('./Socket.actions'); 


const OPTIONS = {
    algorithm: 'aes256',
    key:data.secretKey
}

module.exports =  function socketServer (server, cp) {
  const socketServer = io(server);


  socketServer.use(cookieParser());
 
  socketServer.on('connection', socket => {
    const user = getCoockies(socket);
    logConnection(user);

    socket.emit('USER_CONECTED',user);
    actions.userStatus(cp,user, 1 );



    // socket.on('message', data => {

    //   socketServer.emit('message_s', data);
    // });

    

    socket.on('GET_ORDER_BACK',data=>{
      console.log('GET_ORDER_BACK');
      console.log(data);
      const {id,RID} = data;
      actions.deleteOrder(cp,id, RID,socket,socketServer);
    })

    socket.on('SaveOrder',data=>{

      const user = getCoockies(socket);
      actions.saveOrder(cp,data, user.UserLogin,socket,socketServer);
    })
    
    
    socket.on('UserGeo', data => {
       const user = getCoockies(socket);
       actions.userGeo(cp,user.ID, data.ln, data.lg );
       socketServer.emit('UserGeo', data);
    });

    socket.on('TT_VISIT', data => {
       console.log(data);
      socketServer.emit('TT_was_visited_check_it_now', data);
    });
 

    socket.on('disconnect', () => {
      const user = getCoockies(socket);
      logout(getCoockies(socket));
      socket.emit('USER_DISCONECTED',user);
      actions.userStatus(cp,user, 0 );
    });


  });
}






function logConnection(userdata){
  console.log(userdata.FirstName + " " + userdata.LastName +"  connected at " + new Date() );
}

function logout(userdata){
  console.log(userdata.FirstName + " " + userdata.LastName +"  disconnected at " + new Date() );
}

function getCoockies(socket){
  var cooc = socket && socket.request && socket.request.cookies && socket.request.cookies.UserDao;
  if(cooc){
    return decryptCookie(cooc.slice(4));
  }
  return {};
  
}


function decryptCookie(str) {
  str = str.substring(0,str.lastIndexOf("."));
  var decipher = crypto.createDecipher(OPTIONS.algorithm || defaultAlgorithm, OPTIONS.key);
  var decrypted = decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
  return JSON.parse(decrypted)[0];
}


