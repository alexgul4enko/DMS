export default function getIsoDate(){
	this.date = new Date();
}

getIsoDate.prototype.pad =  function(number) {
	return  (number < 10) ?'0' + number:number;
}

getIsoDate.prototype.getISOString = function(){
	return this.date.getUTCFullYear() +
        '-' + this.pad(this.date.getUTCMonth() + 1) +
        '-' + this.pad(this.date.getUTCDate()) +
        'T' + this.pad(0) +
        ':' + this.pad(0) +
        ':' + this.pad(0) +
        '.' + (0).toFixed(3).slice(2, 5) +
        'Z';
}