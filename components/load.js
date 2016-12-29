
export default function httpGetAsync(theUrl, type, data, succes, error)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            succes(xmlHttp.responseText);
        }
        else if(xmlHttp.readyState === 4 && xmlHttp.status !== 200){
        	console.log(xmlHttp);
        	error(xmlHttp);
        }
    }
    xmlHttp.open(type, theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
    xmlHttp.send(data);
}


