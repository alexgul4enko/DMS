import React , {Component, PropTypes} from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import './HistoryDialog.css';

export default class HistoryDialog extends Component {
	constructor(props){
		super(props);
		this.state = {
			active: true,
		}
		this.closeDialog = this.closeDialog.bind(this);
	}

	

	closeDialog(){
		this.setState({active:false});
		this.props.dismis();
	}

	

	render(){
		return (
			<Dialog
				className = "WHDialog"
				active={this.state.active}
				onEscKeyDown={this.closeDialog}
          		onOverlayClick={this.closeDialog}
			>
				<div className = "history">
					{
						this.props.history.map((data,key)=>{
							return <HistRow 
										key = {key} 
										data = {data.data}
										qty = {data.qty}
									/>
						})
					}
				</div>
				<div className ="buttons hist">
					<span 
						className = "reject material-icons"
						onClick = {this.closeDialog}
					>
						{'cancel'}
					</span>
					
				</div>
			</Dialog>
		)
	}
}



class HistRow extends Component{
	render(){
		return (
			<div className='row'>
				<span>{dateFormster(this.props.data)}</span>
				<span>{this.props.qty+''}</span>
			</div>	
		)
	}
		
}



const dateFormster =(date)=>{
	const year = date.getYear();
	const month = date.getMonth();
	const day = date.getDate();

	return `${year+1990}-${month<10?'0':''}${month}-${day<10?'0':''}${day}`
}




