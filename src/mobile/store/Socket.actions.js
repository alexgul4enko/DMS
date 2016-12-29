import Constances from './soket.constances';
import changeOrderStatus from '../localStore/changeOrderStatus';
import UpdateWHSocket from '../localStore/UpdateWHSocket';
import goBackMyOrder from '../localStore/goBackMyOrder';

const socketActions = {
	setOrderStatusSAVED : (id)=>{
		return (dispatch, getState)=>{
			changeOrderStatus(id)
				.then(()=>{
					dispatch(changeOrderStatusSaved(id));
				})
				.catch(err=>{
					console.log(err.message);
				})
		}
	},
	handleWHChanges : wh =>{
		return (dispatch, getState)=>{
			UpdateWHSocket(wh)
				.then(data=>{
					dispatch(changeGlobalStocks(data));
				})
				.catch(err=>{
					console.log(err.message);
				})
		}
	},
	getBackOrder : id=>{
		return (dispatch, getState)=>{
			goBackMyOrder(id)
				.then(()=>{
					dispatch(changeOrderStatusBACK(id));
				})
				.catch(err=>{
					console.log(err.message);
				})
		}
	}
}

const changeOrderStatusBACK = rehidrate =>{
	return {
		type:Constances.SOCKET_GET_BACK_ORDER,
		rehidrate,
	}
}

const changeGlobalStocks = rehidrate =>{
	return {
		type:Constances.SOCKET_CHANGE_WH_DATA,
		rehidrate,
	}
};

const changeOrderStatusSaved = rehidrate =>{
	return {
		type:Constances.SOCKET_ORDER_SAVED,
		rehidrate,
	}
}





export default socketActions;