import React , {Component, PropTypes} from 'react';
import Grouping from './Grouping';

export default class ProdActionsList extends Component{
	constructor(props){
		super(props);
		this.buildList = this.buildList.bind(this);
		this.tongle = this.tongle.bind(this);
	}

	tongle(condition){
		for(let ref in this.refs){
			condition ? this.refs[ref].open() : this.refs[ref].close() 
		}
	}

	buildList(){
		let data = [];
		let lastGroup ;

		this.props.products.forEach(prod=>{
			const {cat} = prod;
			if(!lastGroup ){
				lastGroup = {cat, products:[prod]}
			}
			else if (lastGroup.cat != cat){
				data.push(<Grouping
								key = {lastGroup.cat} 
								name={lastGroup.cat}
								ref = {lastGroup.cat}
								tongles = {this.props.tongles}
								products = {lastGroup.products}
								actions = {this.props.actions}
								openDialog = {this.props.openDialog}

							/>)
				lastGroup = {cat, products:[prod]}
			}
			else{
				lastGroup.products.push(prod)
			}
		})
		if(lastGroup){
			data.push(<Grouping
								key = {lastGroup.cat} 
								name={lastGroup.cat}
								ref = {lastGroup.cat}
								tongles = {this.props.tongles}
								products = {lastGroup.products}
								actions = {this.props.actions}
								openDialog = {this.props.openDialog}

							/>);
		}
		return data;
	}

	render(){
		return (
				<div className = "prodList">
					{this.buildList()}
				</div>
		)
	}
}

ProdActionsList.propTypes = {

}



/*<Grouping 
								key = {cat} 
								name={cat}
								ref = {cat}
								tongles = {this.props.tongles}
							>
								<div>{prod.name}</div>
							</Grouping>*/