
import  React , {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;


export default class Groups extends Component{
	constructor(props){
		super(props);
		this.state = {
			tongle:true,
		}

		this.handleTongle = this.handleTongle.bind(this);
	}

	handleTongle(){
		this.setState({tongle:!this.state.tongle});
	}


	render(){
		return (this.props.arr && this.props.arr.length)?(
			<ReactCSSTransitionGroup
							transitionName="products"
							transitionEnterTimeout={200}
							transitionAppear={true}
							transitionAppearTimeout={200}
							transitionLeaveTimeout={200}
						>
			<div className = 'prodGroup'>
				<div className = "prodGroupTitle" >
					<span className = "title" onClick = {this.handleTongle}>{this.props.title}</span>
					<span 
						onClick = {this.handleTongle}
						className = "material-icons"
					>
						{this.state.tongle? "expand_more" : "expand_less"}

					</span>
				</div>
						
					<div className = "groupContent">
						
							{this.state.tongle? this.props.arr : null}

					</div>
				

			</div>
			</ReactCSSTransitionGroup>
		):null
	}
}

Groups.propTypes = {
	title:PropTypes.string.isRequired,
	arr : PropTypes.array.isRequired,
}