import React, {PropTypes, Component} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class CheckBox_ extends Component{
	constructor(props){
		super(props);
		this.state = {};
		//this.handleChange = this.handleChange.bind(this);

	

		if (props.variants){
			let vars = props.variants.split(",");

			let preState = {};
			vars.map((variant,i)=>{
				this.state[i] ={text: variant, ischecked :props.answer.includes(variant) } ;
			})
		}

	}

	handleChange(key){
		this.setState({
						[key]: {text: this.state[key].text,
						ischecked: !this.state[key].ischecked} 

						});
		let h = Object.assign({}, this.state,
								{[key]: {text: this.state[key].text,
								ischecked: !this.state[key].ischecked}}
								)
		this.props.setAnswer(Obj_To_String(h));
	}

	render(){

		const CheckBoxes =  Object.keys(this.state).map((key,i)=>{
			return <Checkbox
						key = {i}
						checked = {this.state[key].ischecked}
						label = {this.state[key].text }
						onChange={this.handleChange.bind(this,i)}
					/>
		})
		return (
				<div>
					{CheckBoxes}
				</div>
			)
	}
}



function Obj_To_String (obj){
	let out = "";
	let coma = "";
	for (let i in obj){
		if(obj[i].ischecked){
			out += coma + obj[i].text;
			coma = ",";
		}
		
	}
	return out;
}