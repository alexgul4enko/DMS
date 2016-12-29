import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';



/* eslint-disable react/prefer-stateless-function */
class App extends Component {
	constructor(props){
		super(props);
	}
  	render() {
	    return (
	      <div className="container">
	        {this.props.children}
	      </div>
	    );
	}
}



function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
