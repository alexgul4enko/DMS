import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './app.actions'
import Loading from './Loading/Loading'


class App extends Component {
  	render() {
	    return (
	      <div className="container">
	      	{React.cloneElement(this.props.children, 
	      				{
	      					rehidrate:this.props.rehidrate,
	      					initGpsLocations: this.props.initGpsLocations,
	      				}
	      	)}
	      </div>
	    );
	}
	componentDidMount() {
		this.props.initGpsLocations();
	}
}

App.propTypes= {
	children: PropTypes.element
}



function mapStateToProps(state= {}) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);





// function mapStateToProps(state) {
//   return state;
// }



// export default connect(mapStateToProps)(App);
