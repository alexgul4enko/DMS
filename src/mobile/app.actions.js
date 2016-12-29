import Constances from './Constances'
const appActions = {
	rehidrate : function(){
		return {
			type:Constances.REHIDRATE_STATE,
		}
	},
	initGpsLocations: function(){
		return (dispatch, state)=>{
			if (state().GPS && state().GPS.id){
				navigator.geolocation.clearWatch(state().GPS.id);
			}
			const watchID = navigator.geolocation.watchPosition (
					(data) =>{
						// console.log(data);
						const geoData = {ln:data.coords.latitude, lg:data.coords.longitude};
						dispatch(saveGeoData(geoData));
						emitGeoData(geoData);
					},
					(err) =>{
						console.log(err);
					}
				)
			dispatch(registerGpsTracker(watchID));

		}
	},
}

const emitGeoData = (geo) =>{
	if(window.socket){
		window.socket.emit("UserGeo", geo);
	}
}


const saveGeoData = (payload)  =>{
	return {
		type:Constances.SAVE_GEO_DATA,
		payload,
	}
};

const registerGpsTracker = (payload)  =>{
	return {
		type:Constances.REGISTER_GPS,
		payload,
	}
};

export default appActions;