import React , {Component, PropTypes} from 'react';

export default class RadioButtons extends Component {
	constructor(props){
		super(props);
		let arrr ;
		if (props.answer == 'Отправлен'){
			arrr = [{label:'В работе', checked :false}];
		}
		else{
			arrr = props.alternatives.map(alt=>{
					return {label:alt, checked :alt==props.answer }
				});
		}

		this.state = {
			arr : arrr,
		}

	}


	getData(){
		const ans = this.state.arr.filter(data=>{
			return data.checked;
		})
		return ans.map(a=>a.label).join(',');
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
			const {label, checked} = data;
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
	alternatives : PropTypes.array.isRequired,
	answer :PropTypes.string.isRequired,
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



