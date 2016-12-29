import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from "../redux/actions"
import './app.css'
import Menu from './Menu'
import Load  from "./Load"



class App extends React.Component{

	constructor(){
		super();
		this.fullscreanMode = this.fullscreanMode.bind(this);
		this.logout = this.logout.bind(this);
		this.donotSync = this.donotSync.bind(this);
		this.synchronize = this.synchronize.bind(this);
		
	}

	render(){

		return(
			<div id="preload">
			   <Menu >
			   		<img src="./files/log-out.svg" 
			   				className = "log_out"
			   				onClick={this.logout}></img>
			   		<img src="./files/full-screen.svg" 
			   				className = "full_screen"
			   				onClick={this.fullscreanMode}></img>
			   </Menu>
			   <div id="buttons">
			   		<div id="center">
			           <div className = "clicks" 
			           			id="sync"
			           			onClick={this.synchronize}>
			           					Синхронизироваться
			           			</div>
			           <div className = "clicks" 
			           			id="donotsunc"
			           			onClick={this.donotSync}>Продолжить</div>
			        </div>
	           </div>

	           <Load data = {this.props.data} actions={this.props.actions}/>

        	</div>
		)
	}

	synchronize (){
		
		this.props.actions.synchronize();
	}

	donotSync(){
		this.props.actions.donotSync();
	}
	logout(){
		this.props.actions.logout();
	}

	fullscreanMode(){

		this.props.actions.fullScrean();
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