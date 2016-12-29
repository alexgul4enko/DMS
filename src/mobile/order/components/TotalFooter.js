import React , {Component , PropTypes} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TotalFooter extends Component{
	render (){
		return (
			<div className = "footer">
				<span className = "pointer">{`К-во: ${this.props.qty? this.props.qty.toFixed(2) :"0.00" }`}</span>
				<span className = "pointer">{`$: ${this.props.sum? this.props.sum.toFixed(2) :"0.00"}`}</span>
				<span className = "pointer">{`%: ${this.props.sumDisc? this.props.sumDisc.toFixed(2):"0.00" }`}</span>
			</div>
		)
	}

}


function mapStateToProps(state = {} ) {
	const {qty, sum,sumDisc} = state.order;
	
	return  {qty, sum,sumDisc}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalFooter);





