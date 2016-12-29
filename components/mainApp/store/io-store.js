
import io from 'socket.io-client';


export default function (store) {
  window.socket = io.connect(`${location.protocol}//${location.host}`);

  window.socket.on('start', data => {
  	console.log("connected")
    //store.dispatch(actions.setUserId(data.userId));
  });

  window.socket.on('message', message => {
  	console.log(message);
    //store.dispatch(actions.addResponse(message));
  });
}