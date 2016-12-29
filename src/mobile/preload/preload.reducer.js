import Constances from './constances'
import { browserHistory } from 'react-router'
export default function preload(state = {}, action) {
	switch (action.type) {
		case Constances.UNLOCKAPP:
			return action.payload;

		case Constances.GO_TO_APP:
			browserHistory.push("Home");
			return false;
		case Constances.START_SYNC_DATA:
			browserHistory.push("LoadData");
			return false;
		default:
			return state;
  }
}
