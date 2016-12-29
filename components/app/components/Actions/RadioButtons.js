import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import React, {PropTypes, Component} from 'react';



export default class RadioButtons extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:""
		}	
		console.log(props.answer);

		if(props.answer  ){
			this.state.value = props.answer;
		}
		this.handleChange = this.handleChange.bind(this);


	}

	handleChange(data){
		this.setState({value:data});
		this.props.setAnswer(data);
	}


	render(){
		return (
				 <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
				 	{this.props.variants.split(",").map((key,i)=>{
				 		return <RadioButton label={key} value={key} key={i}/>
				 	})

				 	}

				 </RadioGroup>

			)
	}
	
}