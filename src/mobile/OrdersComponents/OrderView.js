import React , {Component,PropTypes} from 'react';
import OrderViewComponent from './components/OrderViewComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './orderView.actions';

class  OrderView extends Component{
	render (){
		return (
			<OrderViewComponent {...this.props}/>
		)
	}
}


function mapStateToProps(state= {}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);





