import React, {Component, PropTypes} from 'react';
import actions from './Menu.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './menu.css';
import { browserHistory } from 'react-router';
import Dialog from 'react-toolbox/lib/dialog';




class Menu extends Component {
	constructor(props){
		super(props);
		this.state={
			active:false
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.goSync = this.goSync.bind(this);
	}
	render(){
		return(
			<div id = "main_menu">
			 	<span 
			 		className = "material-icons go_back"
			 		onClick = {this.goBack}
			 		>keyboard_arrow_left
			 	</span>
			 	<div className = "fs">
			 		<span  
			 			className= "material-icons sync"
			 			onClick = {this.handleToggle}>
			 			rotate_left
			 		</span>
			 		<span 
			 			className= "material-icons sync"
			 			onClick = {this.props.tongleFulScrenMode}
			 			>open_with
			 		</span>
			 	</div>

			 	<Dialog
					active={this.state.active}
					onEscKeyDown={this.handleToggle}
					onOverlayClick={this.handleToggle}
					title=''
					>
						<div className = "SyncDialog">
							<h1>Начать загрузку даных на сервер?</h1>
							<div className = "SyncButtons">
								<span 
									className = "material-icons"
									onClick = {this.goSync}>done</span>
								<span 
									className = "material-icons"
									onClick = {this.handleToggle}>highlight_off</span>
							</div>
						</div>
				</Dialog>

			 </div>
		)
	}

	goSync(){
		this.handleToggle();
		browserHistory.push("SendData");
	}



	handleToggle(){
		this.setState({active: !this.state.active});
	}

	goBack (){
		browserHistory.goBack();
	}
}



function mapStateToProps(state= {fullScreanMode : false}) {
  return {fullScreanMode: state.fullScreanMode};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


