import React , {Component,PropTypes} from 'react';
import LoadComponent from './LoadComponent';
import SnackBar from './SnackBar';
import { browserHistory } from 'react-router';
 
export default class PreloadList extends Component {
	constructor(props){
		super(props);
		this.state = {
 			active:false,
 			err:"",
 			url:null
 		};
 		this.handleError = this.handleError.bind(this);
 		this.reloadData = this.reloadData.bind(this);
 		this.closeDialog = this.closeDialog.bind(this);
 		this.continue = this.continue.bind(this);

	}

	handleError(err,url){
		
		this.setState({
			err,
			url,
			active:true
		});

	}

	closeDialog(){
		this.setState({
			err:"",
			url:null,
			active:false
		});
	}

	reloadData(){
		const url = this.state.url;
		this.closeDialog();
		this.props.reloadData(url);
		this.props.dispatchLoadData(url);

	}
	continue(){
		browserHistory.replace("Home");
	}



	render(){
		let Finish = true;
		const components = this.props.LoadData.map((data,key)=>{
						if(!data.isFinished){
							Finish = false;
						}
						return <LoadComponent
									name =  {data.name}
									url = {data.url}
									isloadet = {data.isFinished}
									key = {key}
									err = {data.err||false}
									onMount = {this.props.dispatchLoadData}
									showError = {this.handleError}
								/>
					});
		return (
			<div className = "LOO">
			<div className="LoadContainer">
				{components}

				{Finish ? <div className = "Continue" onClick={this.continue}>Продолжить</div> : ""}
				
			</div>

			<SnackBar active = {this.state.active}>
					<div className ="Errordetails">{this.state.err+""}</div>
					<div className ="button Reload" onClick={this.reloadData}>Перегрузить</div>
					<div className ="button Dismiss" onClick={this.closeDialog}>Закрыть</div>
			</SnackBar>
			</div>
		);
	}

};

PreloadList.propTypes = {
	LoadData:PropTypes.array.isRequired,
	dispatchLoadData: PropTypes.func.isRequired,
	reloadData:PropTypes.func.isRequired,
};

