import React , { Component } from 'react'
import ReactStars from 'react-stars'


export default class Starts extends Component {
	constructor(props){
		super(props);
		this.state = {
			count_st : parseInt(props.variants) && 5,
			value: (parseInt(props.answer) 
							&&  parseInt(props.answer) >=0
							&&  parseInt(props.answer) <=parseInt(props.variants) && 5) ?
					parseInt(props.answer) 
					: 0

		};
		this.ratingChanged = this.ratingChanged.bind(this);
	}

	ratingChanged(val){
		this.setState({value:val});
		this.props.setAnswer(val);
	}

	render(){
		return(
				<div className="toStars">
					<ReactStars
					  count={this.state.count_st}
					  onChange={this.ratingChanged}
					  size={"50"}
					  half={true}
					  value = {this.state.value}
					  color1={"#292f32"}
					  color2={'#009688'} 
					/>
				</div>

			)
	}
} 



