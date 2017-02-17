import React , {Component, PropTypes} from 'react';
import MenuItem from './MenuItem';
import  './Menu.css';

export default class  Menu extends Component{
	render(){
		const {location,tongle,items} = this.props;
		const selected = location.substring(location.indexOf('/',2)+1);
		return (
			<div id = "Admin_Menu" className = {tongle ? 'hide': 'show'}>
				<nav>
					<ul>
						{this.renderItems(items,selected)}
					</ul>
				</nav>
			</div>
		)
	}

	renderItems (items =[],selected=''){
		return items.map(item=>(
			<MenuItem 
				key= {item.name} 
				item = {item} 
				selected = {selected ==item.name }
				/>
		))
	}
}

Menu.defaultProps = {
	items: [],
}
Menu.propTypes = {
	tongle:PropTypes.bool.isRequired,
	items:PropTypes.array,
	location: PropTypes.string.isRequired,
}
