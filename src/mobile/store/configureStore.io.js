
import io from 'socket.io-client';
import actions from './Socket.actions';



export default function (store) {
  
  window.socket = io.connect(`${location.protocol}//${location.host}`);

  window.socket.on('connect', data => {
   
  });

  window.socket.on('start', data => {
  	console.log("connected")
    //store.dispatch(actions.setUserId(data.userId));
  });

  window.socket.on('GET_BACK_YOUR_ORDER', data => {
      store.dispatch(actions.getBackOrder(data));
  });
  window.socket.on('WH_CHANGED', data => {
      store.dispatch(actions.handleWHChanges(data));
  });

  window.socket.on('Order_saved', data => {
    store.dispatch(actions.setOrderStatusSAVED(data));
  });

  window.socket.on('message', message => {
  	console.log(message);
    //store.dispatch(actions.addResponse(message));
  });
}

