

const TONGLE_FULL_SCREAN_MODE = "TONGLE_FULL_SCREAN_MODE"

export default function menuReducer(state = false, action) {
	switch (action.type) {
		case TONGLE_FULL_SCREAN_MODE:
			if(!state){
				if(document.documentElement.requestFullScreen) {
					document.getElementsByTagName("body").requestFullScreen();
				} 
				else if(document.documentElement.mozRequestFullScreen) {
					document.getElementsByTagName("body").mozRequestFullScreen();
				} 
				else if(document.documentElement.webkitRequestFullScreen) {
					document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			}
			else{
				if(document.cancelFullScreen) {
					document.cancelFullScreen();
				} 
				else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} 
				else if(document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}
			}
			return !state;

		default:
			return state;
  }
}