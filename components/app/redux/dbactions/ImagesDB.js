export default function ImagesDB(objectStore){
	return {
		dropImage:function(immID){
			return new Promise((resolve, reject)=>{
				const res = objectStore.delete(immID);
				res.onsuccess =  function (){
					resolve(immID);
				}
				res.onerror = function (){
					reject(`ERROR while dell image from DB, ID: ${immID}`);
				}
			});
		},
		sayHello:function(){
			return new Promise((resolve, reject)=>{
				resolve("HEllo");
			});
		}
	}
}
