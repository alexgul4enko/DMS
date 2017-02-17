import React, {Component} from 'react';
import './loading.css';
import Dog from '../../components/dog/Dog';


export default class   Loading extends Component{
	render(){
		return (

					<div className = "fadein">
						<h1>Загружаю...</h1>
						{this.props.show? <Dog/>:''}
					</div>

		)
	}
	componentWillAppear(){
		console.log("componentWillAppear")
	}
	componentDidAppear(){
		console.log("componentDidAppear")
	}
		
}
