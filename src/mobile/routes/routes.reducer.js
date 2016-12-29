import Constances from './Constances';

export function magazinesReducer(state = {}, action) {
	switch (action.type) {
		case Constances.INIT_MAGAZINES:
			return action.payload;
		default:
			return state;
  }
};


export function routesReducer (state = {}, action) {
	switch (action.type) {
		case Constances.INIT_ROUTES:
			return action.payload;
		default:
			return state;
  }
};


