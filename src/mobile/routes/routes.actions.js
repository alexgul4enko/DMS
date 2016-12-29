import Constances from './Constances';
import  rootConst from '../Constances';
import PrepareMagazines from '../localStore/PrepareMagazines';
import initRoutesData from '../localStore/initRoutesData';

const routeActions = {
	rehidrate : function(){
		return {
			type:rootConst.REHIDRATE_STATE,
		}
	},
	initStore: function (){
		return (dispatch, state)=>{
			PrepareMagazines()
				.then((data)=>{
					dispatch(initMagazinesStore(data));
					return initRoutesData();
				})
				.then(routes=>{
					dispatch(initRoutes(routes));
					dispatch(routeActions.rehidrate());
					
				})
				.catch(err=>{
					console.log(err);
					setTimeout(()=>{
						dispatch(routeActions.rehidrate());
					},200);
				})
		}
	},

	// initGpsLocations: function(){
	// 	return (dispatch, state)=>{
	// 		if (state.GPS && state.GPS.id){
	// 			navigator.geolocation.clearWatch(state.GPS.id);
	// 		}
	// 		const watchID = navigator.geolocation.watchPosition (
	// 				(data) =>{
	// 					// console.log(data);
	// 					dispatch(saveGeoData({ln:data.coords.latitude, lg:data.coords.longitude}));
	// 				},
	// 				(err) =>{
	// 					alert(err);
	// 				}
	// 			)
	// 		dispatch(registerGpsTracker(watchID));

	// 	}
	// },


	


};


// const saveGeoData = (payload)  =>{
// 	return {
// 		type:Constances.SAVE_GEO_DATA,
// 		payload,
// 	}
// };

// const registerGpsTracker = (payload)  =>{
// 	return {
// 		type:Constances.REGISTER_GPS,
// 		payload,
// 	}
// };

const initRoutes=(payload)=>{
	return {
		type: Constances.INIT_ROUTES,
		payload,
	}
};

const initMagazinesStore =(payload)=>{
	return {
		type: Constances.INIT_MAGAZINES,
		payload,
	}
};

export default routeActions;