import httpGetAsync from '../../load.js'


var GetData = function (dispatch, url, name, actions){
  let d =  httpGetAsync(url, "GET" , null,
				(data)=>{
					return dispatch(actions.prepareData({succes:true, name:name, data:data, url:url}));
				},
				(err) =>{
					console.log(err);
					return dispatch(actions.prepareData({succes:false, name:name ,data:err, url:url}));
				});
  return d;
}




 module.exports = GetData;