

import React , {Component, PropTypes} from 'react';

export default class RadioDiscounts extends Component {
	constructor(props){
		super(props);

	
		const alternatives = props.alternatives || [];
		let bind_alternatives = [];
		bind_alternatives.push({comment:"", checked :!props.answer  , disc: 0});

		alternatives.map(disc=>{
			bind_alternatives.push({
								comment:disc.com, 
								checked : props.answer   == disc.disc,
								disc: disc.disc});
		});


		this.state = {
			arr : bind_alternatives
		}

	}


	getData(){
		const ans = this.state.arr.filter(data=>{
			return data.checked;
		})
		return ans.map(a=>a.disc).join(',');
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
			const {disc, checked,comment} = data;
			return  <RadioS
						  key = {key}
				          checked={checked}
				          disc={disc}
				          comment = {comment || ''}
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

RadioDiscounts.propTypes = {
	alternatives : PropTypes.any.isRequired,
	answer :PropTypes.any.isRequired,
}



function RadioS (props){
	const class_ = props.checked ? "material-icons green" :"material-icons";
	return (
		<div className = "CHECKBOX_WRAPER">
			<div className="CHECKBOX" onClick = {props.onChange.bind(this,!props.checked)}>
				<span className = {class_}>{props.checked ? "radio_button_checked":"radio_button_unchecked"}</span>
				<span className = "label">{`${props.disc.toFixed(2)} %`}</span>
			</div>
			<div className = "Discount_comment">{props.comment}</div>
		</div>
			
	)
}

RadioS.propTypes ={
	checked: PropTypes.bool.isRequired,
	disc:  PropTypes.number.isRequired,
	comment : PropTypes.string.isRequired,
	onChange : PropTypes.func.isRequired,
}