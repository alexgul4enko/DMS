export default class Sorter {
	constructor(data, less){
		this.list = data;
		this.less = less;

		this.sort();
	}

	sort(){
		this.sorter(this.list,0,this.list.length-1);
	}

	sorter(list, lo, hi){
		if(lo>=hi)return ; 
        let j = this.partition(list, lo, hi);
        this.sorter(list,lo,j-1);
        this.sorter(list,j+1,hi);
	}

	partition(list, lo, hi){
		let i =lo; let j = hi+1;
        let v = list[lo];
        while (true) {            
            while(this.less(list[++i],v)) if(i==hi) break;
            while(this.less(v,list[--j])) if(j==lo)break;
            
            if(i>=j) break;
            this.exch(list, i, j);
        }
        this.exch(list, lo, j);
        return j;
	}

	exch(a,i,j){
		 let temp = a[i];
         a[i] = a[j];
         a[j]= temp;
	}


}