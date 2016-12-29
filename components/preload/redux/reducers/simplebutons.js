const constance = {
	FULL_SCREAN : "FULL_SCREAN",
	LOG_OUT:"LOG_OUT",
	DO_NOT_SYNC : "DO_NOT_SYNC"
};


export default function reducer(fullscreen =false, action){
	switch (action.type){
		
		case constance.FULL_SCREAN:
			if(!fullscreen){
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
			return !fullscreen;

		

		case constance.LOG_OUT:
			document.cookie = 'UserDao=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
			window.location = "/";
			return fullscreen;
		case constance.DO_NOT_SYNC:
			window.location = "/Routes";
			return fullscreen;

		default:
		return fullscreen;
	}
}