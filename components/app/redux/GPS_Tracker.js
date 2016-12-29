

class GPS_Tracker {
    constructor(succes,error,options= {
                                          enableHighAccuracy: false,
                                          timeout: 5000,
                                          maximumAge: 0
                                        }){
        this.succes_ = succes;
        this.error_ = error;
        this.options = options;
        this.success = this.success.bind(this);
     


    }

    registerWacher(){
        this.id = navigator.geolocation.watchPosition(this.success, this.error, this.options);
    }

    success(pos){
        let crd = pos.coords;
        // console.log({lt:crd.latitude, lg:crd.longitude, id:this.id});
         this.succes_({lt:crd.latitude, lg:crd.longitude, id:this.id});
    }
    error(err){
        error_(err);
    }




}

module.exports = GPS_Tracker;
