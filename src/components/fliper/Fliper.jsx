import React ,{Component,PropTypes} from 'react';
import './Fliper.css';



export default class  Fliper extends Component{
	render(){
		return (
			<div className={"flipper-container " + this.props.orientation}>
				<div className={"flipper" + (this.props.flipped ? " flipped" : "")}>
					{this.props.front}
					{this.props.back}
				</div>
			</div>
		)
	}
}
Fliper.defaultProps = {
	orientation: 'horizontal'
}
Fliper.propTypes = {
	front:PropTypes.element.isRequired,
	back: PropTypes.element.isRequired,
	orientation: PropTypes.oneOf(['horizontal','vertical']),
	flipped: PropTypes.bool.isRequired,
}



function Front (props) {
	return (
		<div className="front tile">{props.children}</div>
	)
}

export {Front};
			
const Back = (props)=> (
	<div className="back tile">{props.children}</div>
)

export {Back};

