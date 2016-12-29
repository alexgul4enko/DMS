import React ,{Component , PropTypes} from 'react'


export default class YesNo extends Component{
	constructor(props){
		super(props);

		this.sayYes = this.sayYes.bind(this);
		this.sayNo = this.sayNo.bind(this);

	}

	sayYes(){
		this.props.setAnswer(1);
	}
	sayNo(){
		this.props.setAnswer(0);
	}

	render(){
		return (
				<div className = "YESNO">
					<div className="NO" onClick = {this.sayNo}>Нет</div>
					<div className = "YES" onClick = {this.sayYes}>Да</div>
				</div>
			)
	}


}