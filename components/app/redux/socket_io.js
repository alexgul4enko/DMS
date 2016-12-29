
import io from 'socket.io-client';


// export default function promiseMiddleware() {
//   return (next) => (action) => {
//     const { promise, types, ...rest } = action;
//     if (!promise) {
//       return next(action);
//     }
//     const [REQUEST, SUCCESS, FAILURE] = types;
//     next({ ...rest, type: REQUEST });
//     return promise.then(
//       (result) => {
//         next({ ...rest, result, type: SUCCESS });
//       },
//       (error) => {
//         next({ ...rest, error, type: FAILURE });
//       }
//     );
//   };
// }




export default function (store) {
  window.socket = io.connect(`${location.protocol}//${location.host}`);

  window.socket.on('start', data => {
    store.dispatch(actions.setUserId(data.userId));
  });

  window.socket.on('message', message => {
    store.dispatch(actions.addResponse(message));
  });
}