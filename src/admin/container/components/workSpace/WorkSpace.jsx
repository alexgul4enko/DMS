import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './WorkSpace.css';
import uuid from 'node-uuid';  

export default class WorkSpace extends Component{
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.location != this.props.location  || nextProps.tongle != this.props.tongle;
	}
	render (){
		const items = this.props.children	?
				 [React.cloneElement(this.props.children, {key :this.props.location})] : 
				 [<Welcome key = {this.props.location}/>];
		return (
			<div id = "admin_WorkSpace" className = {this.props.tongle ? 'hide': 'show'}>
				<ReactCSSTransitionGroup
		          transitionName="example"
		          transitionEnterTimeout={300}
		          transitionLeaveTimeout={300}>
					{items}
				</ReactCSSTransitionGroup>
			</div>
		)
	}


	
}

     
        

const Welcome = ()=>(<div id = "welcomeImage"></div>);