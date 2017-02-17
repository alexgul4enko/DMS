import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import './root.css'

const Root = props =>{
	return (
		<Provider store={props.store}>
			   <Router 
			    history={props.history} 
			    routes={routes} 
			    changeReducer = {props.store.replaceReducer}
			   />
		</Provider>
	)
}
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;