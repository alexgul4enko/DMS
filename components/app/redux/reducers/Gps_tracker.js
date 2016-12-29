import constance from '../Constances'
import { browserHistory } from 'react-router'


export default function Gps_tracker (data = {}, action){
	switch (action.type){


		case constance.GO_BACK:

			const  llen = data.backStage.length -1;
			browserHistory.goBack();
			return Object.assign({},data,{
										backStage: data.backStage.filter((data,id)=>{
											return id !=llen; 
										})
								}
			);


		case constance.TT_CAMERA:
			return Object.assign({},data,{
										action:action.value,
										order:null,
										product:null
								}
			);
		
		case constance.BACKSATGE:
			return Object.assign({}, data, {
						backStage: [...data.backStage, action.value]  
					});
				break;
		case constance.FULL_SCREAN:
				if(data.fullscrean){
					if(document.documentElement.requestFullScreen) {
	                	document.getElementsByTagName("body").requestFullScreen();
		              } else if(document.documentElement.mozRequestFullScreen) {
		                	document.getElementsByTagName("body").mozRequestFullScreen();
		              } else if(document.documentElement.webkitRequestFullScreen) {
		              		 document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		              }
				}
				else{
					 if(document.cancelFullScreen) {
	                	 document.cancelFullScreen();
		               } else if(document.mozCancelFullScreen) {
		                 document.mozCancelFullScreen();
		               } else if(document.webkitCancelFullScreen) {
		                 document.webkitCancelFullScreen();
		               }
				}
				return Object.assign({}, data, {
						fullscrean:!data.fullscrean
					});
				break;
		case constance.SELECT_TT:
				return Object.assign({}, data, {
						TT:action.value,
						backStage:[...data.backStage, "Routes"]
					});
				break;

		case constance.GPS_ON:
				return Object.assign({}, data, {
						GPS_ON:true
					});
				break;
		case constance.GPS_TRACKER:
				if(data.GPS_ON){
					window.socket.emit('gpslocation', action.value);
					const {value} = action;
					return Object.assign({}, data, {
							ln:value.ln,
							lg:value.lg
						});
				}
				
				return data;
				break;

		case constance.INIT_GPS:
			
				return Object.assign({}, data, {
						GPS_ON:action.value
					});
				
				
				return data;
				break;

		case constance.STOP_GPR:
				navigator.geolocation.clearWatch(data.GPS_ON);
				return Object.assign({}, data, {
						id:null,
						GPS_ON:false
					});
				break;

		
		default:
		return data;
	}
}
