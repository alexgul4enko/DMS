import React , {Component , PropTypes} from 'react'
import ProductComponent from './ProductComponent'

export default class Grouping extends Component{
	constructor(props){
		super(props);
		this.state = {
			tongled:props.tongles,
		}
		this.tongle = this.tongle.bind(this);
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}

	close(){
		this.setState({tongled: false});
	}
	open(){
		this.setState({tongled: true});
	}

	tongle(){
		this.setState({tongled: !this.state.tongled});
	}

	render(){
		return (
			<div>
			<div onClick ={this.tongle} className = 'GroupsProds'>
				<span >{this.props.name}</span>
				<nav 
					className = "material-icons">
					{this.state.tongled ? 'keyboard_arrow_up':'keyboard_arrow_down'}
				</nav>
			</div>
			{this.state.tongled ? null : this.props.products.map(prod=>{
				return <ProductComponent 
							key = {prod.id} 
							name = {prod.name}
							color = {prod.color}
							pic = {prod.pic}
							openDialog = {this.props.openDialog}
							actions = {
								this.props.actions.map(act=>{
									const {id} = act;
									return {...act , prodId:prod.id , answer : prod.answers[id] || null}
								})
							}
							/>
			}) }
			</div>
		)
	}



	
	
}


Grouping.defaultProps={
	name:'Nn name',
}

Grouping.propTypes = {
	name: PropTypes.string,
}