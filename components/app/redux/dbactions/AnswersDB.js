export default function AnswersDB(objectStore){
	return {
		dropAnswer:function(ans_id){
			return new Promise((resolve, reject)=>{
				const res = objectStore.delete(ans_id);
				res.onsuccess =  function (){
					resolve(null);
				}
				res.onerror = function (){
					reject(`ERROR while dell answer from DB, ID: ${ans_id}`);
				}
			});
		},
		updateAnswer:function(new_ans){
			return new Promise((resolve, reject)=>{
				const res = objectStore.put(new_ans);
				res.onsuccess =  function (){
					resolve(new_ans);
				}
				res.onerror = function (){
					reject(`ERROR while upd answer in DB, ID: ${new_ans.id}`);
				}
			});
		}
	}
}
