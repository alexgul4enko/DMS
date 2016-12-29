import React , {Component,PropTypes} from 'react'; 
import RadioButtons from './RadioButtons';
import './orderDialog.css'
import RadioDiscounts from './RadioDiscounts';
import TextQuestion from './TextQuestion';
import RadioDelivery from './RadioDelivery';

export default class OrdersDialog extends Component {

	constructor(props){
		super(props);
		this.getTitle = this.getTitle.bind(this);
		this.getDialogContent = this.getDialogContent.bind(this);
		this.handleAnswer = this.handleAnswer.bind(this);
	}


	getTitle(type){
		switch(type){
			case 1:
				return "Форма оплаты";
			case 2:
				return "Скидка на заказ";
			case 3:
				return "Коментарий к заказу";
			case 4:
				return "Способ доставки";
			default:
				return "";
		}
	}


	handleAnswer(){
		const answ = this.refs.checkAns.getData();
		this.props.okListener(answ);
	}


	getDialogContent(){
		switch(this.props.type){
			case 1:
				return (
					<RadioButtons
						ref="checkAns"
						alternatives = {this.props.answers}
						answer = {this.props.answer}
					/>
				);
			case 2:
				return (
					<RadioDiscounts
						ref="checkAns"
						alternatives = {this.props.answers}
						answer = {this.props.answer}
					/>
				);
			case 3:
				return(
					<TextQuestion
						answer = {this.props.answer}
						ref="checkAns"/>
				);
			case 4:
				return (
					<RadioDelivery
						ref="checkAns"
						alternatives = {this.props.answers}
						answer = {this.props.answer}
					/>
				);
			default:
				return "";
		}
	}

	render (){
		return (
			<div className = "dialog_content">
				<h1>{this.getTitle(this.props.type)}</h1>
				<div className = "answers">
					{this.getDialogContent()}
				</div>
				<div className ="buttons">
					<span 
						className = "reject material-icons"
						onClick = {this.props.close}
					>
						{'cancel'}
					</span>
					<span 
						className = "ok material-icons"
						onClick = {this.handleAnswer}
					>
					{'check'}
					</span>
				</div>
			</div> 
		)
	}
}




OrdersDialog.defaultProps = {
	type:0,
}

OrdersDialog.propTypes = {
	type: PropTypes.number.isRequired,
	close: PropTypes.func.isRequired,
	okListener: PropTypes.func.isRequired,
	answers:PropTypes.any,
	answer:PropTypes.any,
}
