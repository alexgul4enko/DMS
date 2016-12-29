import React, {Component, PropTypes} from 'react';
import actions from './Loader.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './loader.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import LoadingComponent from './LoadingComponent';





class Loader extends Component {
	constructor(props){
		super(props);
	}
	render(){
		const loader = this.props.loader;
		return(
			<div id = "loaders_data">
				
			 	{
			 		(loader && loader.lab && loader.lab.length)?
			 				loader.lab.map((label)=>{
			 					return (
			 							<ReactCSSTransitionGroup
			 								key={label} 
											transitionName="loaders"
											transitionEnterTimeout={500}
											transitionAppear={true}
											transitionAppearTimeout={500}
											transitionLeaveTimeout={500}
										>
											<div className = "label" >{label}</div>
										</ReactCSSTransitionGroup>
			 						)
			 				}) : null

			 	}
			 	{
			 		(loader && loader.lab && (loader.images || loader.images==0)) ? 	
			 							(<ReactCSSTransitionGroup
											transitionName="loaders"
											transitionEnterTimeout={500}
											transitionAppear={true}
											transitionAppearTimeout={500}
											transitionLeaveTimeout={500}
										>
											<div className = "label" >{`Обнаружено ${loader.images} фото`}</div>
											<div className = "label" >{`Загрузил ${loader.loadetIM} с ${loader.images} фото`}</div>
										</ReactCSSTransitionGroup>
			 						): null
			 	}

			 	{
			 		(loader && loader.ttl && loader.ttl.length ) ?
			 					loader.ttl.map((data,ll)=>{
			 						return	(<ReactCSSTransitionGroup
			 								key = {ll+100}
											transitionName="loaders"
											transitionEnterTimeout={500}
											transitionAppear={true}
											transitionAppearTimeout={500}
											transitionLeaveTimeout={500}
										>
											<LoadingComponent 
												title = {data.label}
												isloadet  = {data.isload}/>
											
										</ReactCSSTransitionGroup>)
			 						
			 					})
			 			: null
			 	}

			 	{
			 		loader && loader.done ? 
			 			<ReactCSSTransitionGroup
							transitionName="loaders"
							transitionEnterTimeout={500}
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionLeaveTimeout={500}
						>
			 				<div 
			 					className = "Final"
			 					onClick = {this.redirect}
			 				>
			 					Завешить отправку
			 				</div>
			 			</ReactCSSTransitionGroup>: null
			 	}
			 	

			 </div>
		)
	}

	redirect(){
		window.location="/";
	}
	componentDidMount() {
		this.props.startLoad();
	}
	componentWillUnmount() {
		this.props.clearStage();
	}
}




function mapStateToProps(state= {}) {
  return {
  	loader: state.loader,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);


