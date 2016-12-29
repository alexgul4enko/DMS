import React ,{Component} from 'react'
import Slider from 'react-toolbox/lib/slider';


export default class SliderBar extends Component {
	constructor (props){
		super(props);
		let vars = props.variants.split('-');
		this.state = {
			value: (parseInt(this.props.answer)  
							&&  parseInt(this.props.answer)  >= (parseInt(vars[0]) || 0)
							&&  parseInt(this.props.answer)  <= (parseInt(vars[1]) || 10)) ?
						parseInt(this.props.answer)  
						: 0 ,
			from: parseInt(vars[0]) || 0,
			to: parseInt(vars[1]) || 10
		};
		this.handleChange = this.handleChange.bind(this);

	}


	handleChange(val){
		this.setState({value:val});
		this.props.setAnswer(val);
	}

	render (){
		return (
				<Slider 
					min={this.state.from} 
					max={this.state.to} 
					editable 
					step={1}
					value={this.state.value} 
					onChange={this.handleChange} />
			)
	}
}