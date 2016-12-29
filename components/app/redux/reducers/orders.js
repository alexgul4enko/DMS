import constance from '../Constances'
import { browserHistory } from 'react-router'

export default function orders (data = {}, action){
	switch (action.type){

		case constance.CREATE_NEW_ORDER:
			browserHistory.push('OrdersDetails');
			return data;
		case constance.SYNC_FROM_ORDERS:
			browserHistory.push('LoadData');
			return data;
		case constance.TONGLE_ORDERS_DRAWER:
			return Object.assign({},data, {showDrawer : !data.showDrawer})
		case constance.SHOW_ORDER_MENU_DIALOG:
			return Object.assign({},data, {
					showDrawer:false,
					showDialog:true,
					dialogType:action.dialogType
			});
		case constance.CLOSE_DIALOG_ORDERS:
			return Object.assign({},data, {
							showDrawer : false,
							showDialog : false,
							dialogType: null
						})

		default:
		return data;
	}
}

