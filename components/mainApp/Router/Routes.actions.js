const galeryImageActions = {

	removeGalleryImage: function(key){
		return {
			type: constance.REMOVE_GALLERY_IMAGE,
			key
		}
	},
	getTest: function(){
		console.log("test from actions")
		return{
			type:"test"
		}
	}
	
} 

export default galeryImageActions;