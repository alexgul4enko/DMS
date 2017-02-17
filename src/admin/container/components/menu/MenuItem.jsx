import React , {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router';

export default class MenuItem extends Component{
	menuItemClick(){
		browserHistory.push(`/AdminPane/${this.props.item.name}`);
	}
	render(){

		return (
			<li onClick = {this.menuItemClick.bind(this)} className = {this.props.selected ? 'selected':''}>
				<span className = "material-icons">{this.props.item.icon}</span>
				<span className = "title">{this.props.item.title}</span>
			</li>
		)
	}
}

MenuItem.defaultProps = {
	selected:false,
}

MenuItem.propTypes = {
	selected:PropTypes.bool,
	item:PropTypes.shape({
	    icon: PropTypes.string,
	    title: PropTypes.string,
	    name:PropTypes.string,
	  })
}

