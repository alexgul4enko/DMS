import React , {Component, PropTypes} from 'react';

export default class RadioButtons extends Component {
	constructor(props){
		super(props);

	
		const alternatives = props.alternatives || [];

		let bind_alternatives  = alternatives.map(alt=>{
			return {label:alt.name, checked :alt.id==props.answer ,id:alt.id }
		});
		this.state = {
			arr : bind_alternatives
		}

	}


	getData(){
		const ans = this.state.arr.filter(data=>{
			return data.checked;
		})
		return ans.map(a=>a.id).join(',');
	}



	handleChange(field){

		this.setState({
				arr : this.state.arr.map((data,key)=>{
					if(key == field){
						return Object.assign({},data,{checked:true})
					}
					return Object.assign({},data,{checked:false})
				})
			});

	}

	render(){
		const checkBoxes = this.state.arr.map((data,key)=>{
			const {label, checked,id} = data;
			return  <Radio
						  key = {key}
				          checked={checked}
				          label={label}
				          onChange={this.handleChange.bind(this, key)}
				        />
		})

		return(
				<div className = "checkBoxes aa">
					<div className = "box">
						{checkBoxes}
					</div>
				</div>
		)
	}
}

RadioButtons.RadioButtons = {
	alternatives : PropTypes.any.isRequired,
	answer :PropTypes.any.isRequired,
}



function Radio (props){
	const class_ = props.checked ? "material-icons green" :"material-icons";
	return (
		<div className="CHECKBOX" onClick = {props.onChange.bind(this,!props.checked)}>
			<span className = {class_}>{props.checked ? "radio_button_checked":"radio_button_unchecked"}</span>
			<span className = "label">{props.label}</span>
		</div>
	)
}

Radio.propTypes ={
	checked: PropTypes.bool.isRequired,
	label:  PropTypes.string.isRequired,
	onChange : PropTypes.func.isRequired,
}