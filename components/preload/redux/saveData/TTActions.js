
export default function saveTTActions(data){
	if (!data){
		return;
	}
	data = JSON.parse(data);
	let out ={};
	data.map((row)=>{
		if(!out[row.RouteID]){
			out[row.RouteID]=[];
		}
		out[row.RouteID].push({task:row.TaskID, key:row.id});
	})
 	
	console.log(out);
}