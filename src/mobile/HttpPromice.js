export default function httpPromice(theUrl, type, data){
	return new Promise((resolve,reject)=>{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.addEventListener("error", ()=>{
			reject("error");
		}, false);
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
	        	resolve(JSON.parse(xmlHttp.responseText));
	        }
	        else if(xmlHttp.readyState === 4 && xmlHttp.status !== 200){
	        	if(xmlHttp.status == 502 && xmlHttp.responseText == "empty"){
	        		resolve([]);
	        	}
	        	else{
	        		reject("ERROR 404");
	        	}
	        	
	        }
	    }
	    xmlHttp.open(type, theUrl, true); // true for asynchronous 
	    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
	    xmlHttp.send(JSON.stringify(data));
	});
}