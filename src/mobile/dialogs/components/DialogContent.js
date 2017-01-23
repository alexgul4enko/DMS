import React , {Component, PropTypes} from 'react';
import RejectQuestion from './RejectQuestion';
import VisitDialog from './VisitDialog';
import Checkbox from './ChekBoxes';
import RadioButtons from './RadioButtons';
import YesNo from './YesNo';
import Range from './Range';
import Rate from './Rate';
import TextQuestion from './TextQuestion';
import IntegerQuestion from './IntegerQuestion';

export default class DialogContent extends Component{

	constructor(props){
		super(props);
		this.getAnswer = this.getAnswer.bind(this);
	}

	getAnswer(){
		if(!this.props.rejected && this.props.type == -12){
			return null;
		}
		return this.refs.content.getData();
	}


	render (){

		const getContent =()=>{

			if(this.props.rejected){
				const ans = this.props.reject ? this.props.answer : "";
				return (<RejectQuestion answer = {ans} ref = "content"/>);
			}
			else{
				const answer = this.props.reject ? "" :this.props.answer||""; 
				switch(this.props.type){
					case -12:
						return (<VisitDialog />);
					case 1:
						return (<Checkbox 
									ref = "content"
									question = {this.props.question}
									alternatives = {this.props.alternatives}
									answer = {answer} />);
					case 2:
						return (<RadioButtons 
									ref = "content"
									question = {this.props.question}
									alternatives = {this.props.alternatives}
									answer = {answer} />);
					case 3:
						return (<YesNo 
									ref = "content"
									question = {this.props.question}
									answer = {answer} />);
					case 4:
						return (<Range 
									ref = "content"
									question = {this.props.question}
									alternatives = {this.props.alternatives}
									answer = {answer} />);
					case 5:
						return (<Rate 
									ref = "content"
									question = {this.props.question}
									alternatives = {this.props.alternatives}
									answer = {answer} />);
					case 6:
						return (<TextQuestion 
									ref = "content"
									question = {this.props.question}
									answer = {answer} />);

					case 10:
						return (<IntegerQuestion 
									ref = "content"
									question = {this.props.question}
									value = {answer}
								/>);

					default :
						return (<p>asdasda</p>);
				}
			}

		};
	
		return (getContent());
	}
}


DialogContent.propsTypes = {
	answer : PropTypes.any,
	handleReject:PropTypes.func,
	type : PropTypes.number,

}