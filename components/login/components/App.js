import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from "../reducer/actions"
import './app.css'



class App extends React.Component{

	constructor(){
		super();
		this.typePass = this.typePass.bind(this);
		this.typeLogin = this.typeLogin.bind(this);
		this.login = this.login.bind(this);
	}

	render(){
		return(
			<div id="form">
	            <img src="./files/big-logo-ba.png" className="logo"/>
	            <input 
	            	id ="login" 
	            	type="text" 
	            	placeholder="Логин:" 
	            	name="login" 
	            	value={this.props.login}
	            	onChange={this.typeLogin}
	            	/>
	            <input 
	            	id="pass" 
	            	type="password" 
	            	placeholder="Пароль:" 
	            	name="password" 
	            	value={this.props.pass}
	            	onChange={this.typePass}/>
	           
	            <button 
	            	id="loginBtn"
	            	onClick={this.login}> 
	            	<img src="./files/login.svg" className="loginImg"/>
	            </button>
	            <span id="Error" className= "Error">{this.props.error}</span>
        	</div>
		)
	}
	
	login(e){
		this.props.actions.asincLogin();
	}

	typePass(e){
		let pass = e.target.value;
		this.props.actions.changepass(pass);
		

	}
	typeLogin(e){
		let login = e.target.value;
		this.props.actions.changelogin(login);
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