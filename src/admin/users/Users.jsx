import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './users.actions';
import './users.css';
import UsersList from './components/UsersList'

class Users extends Component{
	render (){
		return( <div id = "ad-MyUsers">
					<div className = "usersList">
						<UsersList 
							users = {this.props.users}
						/>
					</div>
					<div className = "newUser">
					</div>
				</div>)
	}
	componentWillMount() {
		if(!this.props.users ||  !this.props.users.length) {
			this.props.initUsers();
		}
	}
}

function mapStateToProps(state= {}) {
  return {
  	users : state.myUsers,
    user : state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);