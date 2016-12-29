import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from "../redux/actions"
import './app.css'

import Users from './Users'

class App extends React.Component{

	constructor(){
		super();
		
	}

	render(){

		return(

			<div>
				<Users userlist = {this.props.usersList} 
						filter = {this.props.actions.filtUser}
						selectUser = {this.props.actions.selectUser}
					    selectedid = {this.props.SelectedUserId}/>
	
				
			</div>
		)
	}
}

function mapStateToProps (state) {
	return state;
}

function mapDispatchToProps (dispatch){
	return {
		actions: bindActionCreators(actions,dispatch)
	}

}

export default connect (mapStateToProps, mapDispatchToProps)(App);