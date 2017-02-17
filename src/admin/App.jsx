import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './app.actions'
import { Link } from 'react-router'
import Loading from './Loading/Loading';
import Container from './container/Container';
import Fliper , {Front, Back} from '../components/fliper/Fliper';


class App extends Component {
  	render() {
  		return (
  			<Fliper
  				flipped = {isObjectNotEmpty(this.props.user)}
  				orientation = "horizontal"
  				front = {<Front><Loading show = {!isObjectNotEmpty(this.props.user)}/></Front>}
  				back = {<Back>  
                    <Container 
                      user = {this.props.user} 
                      location = {this.props.location.pathname}
                      loading = {this.props.load.loading}
                      err = {this.props.load.err}
                      closeError = {this.props.closeError}
                    >
                      {this.props.children}
                    </Container> 
                  </Back>}
  			/>

  		)
	}
	componentDidMount() {
		setTimeout(()=>{
			this.props.getUser();
		},1200)
	}
}

App.propTypes= {
	children: PropTypes.element
}

const isObjectNotEmpty = (obj = {})=>{
	const keys = Object.keys(obj);
	return (keys && keys.length && keys.length >0) ? true : false;
}




function mapStateToProps(state= {}) {
  return {
  	user : state.user,
    load : state.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


