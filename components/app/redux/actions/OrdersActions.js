import constance from '../Constances'

const ordersActions = {
	createNewOrder:function(){
		return {
			type: constance.CREATE_NEW_ORDER
		}
	},
	syncFromOrders:function(){
		return {
			type: constance.SYNC_FROM_ORDERS
		}
	},
	tongleDrowerMenu:function(){
		return {
			type: constance.TONGLE_ORDERS_DRAWER
		}
	},
	showOrderMenuDialog: function(dialogType){
		return {
			type: constance.SHOW_ORDER_MENU_DIALOG,
			dialogType
		}
	},
	closeOrderDialog:function(){
		return {
			type: constance.CLOSE_DIALOG_ORDERS
		}
	}
} 

export default ordersActions;