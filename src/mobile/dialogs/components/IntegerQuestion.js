import React , {Component, PropTypes} from 'react';
import './stocksDialog.css';

export default class IntegerQuestion extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:props.value||"0",
		}
		this.claerValue = this.claerValue.bind(this);
		this.pressNumber = this.pressNumber.bind(this);
		this.zeroPress = this.zeroPress.bind(this);
		this.dotPressed = this.dotPressed.bind(this);
		this.delPressed = this.delPressed.bind(this);
		this.getData = this.getData.bind(this);
	}

	getData(){
		return this.state.value;
	}



	pressNumber(e){
		const value = e.target.innerText;
		if(!this.state.value || this.state.value == "0"){
			this.setState({value});
		}
		else{
			this.setState({value:this.state.value + value});
		}
	}

	zeroPress(){
		if(this.state.value && this.state.value != "0"){
			this.setState({value:this.state.value + "0"});
		}

	}
	dotPressed(){
		if(!this.state.value.includes('.')) {
			this.setState({value:this.state.value + "."});
		}
	}

	delPressed(){
		let {value} = this.state;
		if(value){
			if(value.length && value.length>1){
				this.setState({value:value.substring(0,value.length-1)});
			}
			else if(value.length && value.length==1){
				this.setState({value:"0"});
			}
		}
	}

	claerValue(){
		this.setState({value:"0"});
	}

	render(){
		return (
			<div className = "data">
				<h1>{this.props.question}</h1>
				<div className = "Number_root">
					<div className = "Number_ROW">
						<span className= "Number_input">{this.state.value}</span>
						<span className= "Number_button" onClick = {this.claerValue}>{'C'}</span>
					</div>
					<div className = "Number_ROW">
						<span className= "Number_button" onClick = {this.pressNumber}>{'1'}</span>
						<span className= "Number_button" onClick = {this.pressNumber}>{'2'}</span>
						<span className= "Number_button" onClick = {this.pressNumber}>{'3'}</span>
					</div>
					<div className = "Number_ROW">
						<span className= "Number_button" onClick = {this.pressNumber}>{'4'}</span>
						<span className= "Number_button" onClick = {this.pressNumber}>{'5'}</span>
						<span className= "Number_button" onClick = {this.pressNumber}>{'6'}</span>
					</div>
					<div className = "Number_ROW">
						<span className= "Number_button" onClick = {this.pressNumber}>{'7'}</span>
						<span className= "Number_button" onClick = {this.pressNumber}>{'8'}</span>
						<span className= "Number_button" onClick = {this.pressNumber}>{'9'}</span>
					</div>
					<div className = "Number_ROW">
						<span className= "Number_button" onClick = {this.dotPressed}>{','}</span>
						<span className= "Number_button" onClick = {this.zeroPress}>{'0'}</span>
						<span className= "Number_button" onClick = {this.delPressed}>{'<'}</span>
					</div>

				</div>
			</div>
				
		)
	}
}


IntegerQuestion.propTypes = {
	value:PropTypes.string.isRequired,
	question:PropTypes.string,
}



