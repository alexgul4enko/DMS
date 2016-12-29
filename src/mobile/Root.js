import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from './routes';
import './root.css'

class Root extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			  <Provider store={this.props.store}>
			    <Router 
			    		history={this.props.history} 
			    		routes={routes} 
			    		changeReducer = {this.props.store.replaceReducer}/>
			  </Provider>
			)
	}
}



Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;