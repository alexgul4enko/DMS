import React , {Component,PropTypes} from 'react';
import OrdersComponent from './components/OrdersComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './Order.actions';
import Loading from '../Loading/Loading';

class Order extends Component {

	render (){
		return this.props.showContent ? <OrdersComponent {...this.props}/>  : <Loading/> ;
	}

	// shouldComponentUpdate (nextProps, nextState) {
	// 	if(nextProps.GPS.ln != this.props.GPS.ln || nextProps.GPS.lg != this.props.GPS.lg){
	// 		return false;
	// 	}

	// 	if(nextProps.fullScreanMode != this.props.fullScreanMode){
	// 		return false;
	// 	}

	// 	return true;
	// }

	componentWillMount() {
		const RID = this.props.order.RID;
		this.props.rehidrate();
		this.props.initData(RID);
	}

	componentWillUnmount() {
		this.props.saveOrderChanges(this.props.order);
		this.props.saveStocksCanges({id:this.props.order.RID, data: this.props.Stocks});
	}
}

Order.propTypes = {
	rehidrate : PropTypes.func.isRequired,
}




function mapStateToProps(state = {}) {
	return  {
		order :state.order,
		PayForms : state.PayForms,
		showContent: state.showContent,
		Stocks : state.Stocks,

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);

