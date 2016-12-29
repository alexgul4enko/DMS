import Constances from './Constances';
import DeleteByKey from '../localStore/DeleteByKey';
import PutData from '../localStore/PutData';
const orderMainActions  = {
	deleteOrder:id =>{
		return (dispatch, getState)=>{
			DeleteByKey("Orders", id)
				.then(()=>{
					dispatch(del_Order(id));
				})
				.catch(err=>{
					console.log(err);
				})
			
		}
	},

	getOrderBack:(id,RID)=>{
		if(window.socket){
			window.socket.emit("GET_ORDER_BACK", {id,RID});
		}
		return {
			type:null,
		}
	},

	changeStatus:(id,status,order)=>{
		return (dispatch, getState)=>{
			const changeComment = Object.assign({},order, {status});
			if(status ==2){
				emitOrder(changeComment);
			}
			
			PutData("Orders",changeComment)
				.then(()=>{
					dispatch(Upd_OrderStatus({id,status}));
				})
				.catch(err=>{
					console.log(err);
				})
				
			
		}
	},

	changeComment:(id,comment,order)=>{
		return (dispatch, getState)=>{
			const changeComment = Object.assign({},order, {comment});

			PutData("Orders",changeComment)
				.then(()=>{
					dispatch(Upd_OrderComment({id,comment}));
				})
				.catch(err=>{
					console.log(err);
				})
		}
	},
	initOrder : rehidrate =>{
		return {
			type : Constances.INIT_ORDER_ORDERCOMPONENT,
			rehidrate,
		}
	}

	


}

const emitOrder= (order) =>{
	if(window.socket){
		window.socket.emit("SaveOrder", order);
	}
}





const del_Order  = rehidrate =>{
	return {
		type : Constances.DELETE_ORDER_VIEW,
		rehidrate,
	}
}

const Upd_OrderStatus  = rehidrate =>{
	return {
		type : Constances.UPDATE_STATUS_VIEW,
		rehidrate,
	}
}

const Upd_OrderComment = rehidrate =>{
	return {
		type : Constances.UPDATE_COMMENT_VIEW,
		rehidrate,
	}
}


export default orderMainActions;