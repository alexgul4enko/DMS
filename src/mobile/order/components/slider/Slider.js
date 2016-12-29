import React , {Component,PropTypes} from 'react'; 
import Drawer from 'react-toolbox/lib/drawer';
import Dialog from 'react-toolbox/lib/dialog';
import './Slider.css';
import SliderComponent from './SliderComponent';

export default class Slider extends Component {
	render(){
		return (
			<div>
				<Drawer 
					active={this.props.active} 
					className = "OrderMenuSlider" 
					onOverlayClick={this.props.tongleMenu}>
					<SliderComponent 
						title = "Форма оплаты"
						status = {this.props.status}  
						clickHandler = {this.props.showPayFormsDialog} />
					<SliderComponent 
						title = "Скидка"
						status = {this.props.status}  
						clickHandler = {this.props.showDiscountDialog} />
					<SliderComponent 
						title = "Коментарий"
						status = {this.props.status}  
						clickHandler = {this.props.showOrderCommentDialog} />
					<SliderComponent 
						title = "Форма доставки" 
						status = {this.props.status} 
						clickHandler = {this.props.showDeliveryDialog} />
					<SliderComponent 
						title = "Выйти"  
						status = {1}
						clickHandler = {this.props.OutOrder} />
				</Drawer>
			</div>
		)
	}

}

Slider.propTypes = {
	active:PropTypes.bool.isRequired,
	tongleMenu:PropTypes.func.isRequired,
	showPayFormsDialog:PropTypes.func.isRequired,
	showDiscountDialog:PropTypes.func.isRequired,
	showOrderCommentDialog :PropTypes.func.isRequired,
	showDeliveryDialog : PropTypes.func.isRequired,
	OutOrder :PropTypes.func.isRequired,
	status : PropTypes.number.isRequired,
}
