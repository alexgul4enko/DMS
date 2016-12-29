export default function combineReducers (reducers) {
    var keys = Object.keys(reducers);

    return function (state = {}, action) {
        return keys.reduce((newState, key) => {
            var reducer = reducers[key];
            var currentState = state[key];

            newState[key] = reducer(currentState, action);
            return newState;
        }, {});
    };
};



export default function (keyedReducers = {}, ...reducers) {
  return function (state = {}, action) {
    let result = state;

    // run reducers that are specific to top-level keys
    result = Object.keys(keyedReducers).reduce((prev, key) => {
      let reducer = keyedReducers[key];
      return prev.set(key, reducer(prev.get(key), action));
    }, result);

    // run reducers that access the complete state
    result = reducers.reduce((prev, reducer) => {
      return reducer(prev, action);
    }, result);

    return result;
  };
}