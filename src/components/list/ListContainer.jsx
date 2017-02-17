import React , {Component} from 'react';
import List from './List';
import ListHeader from './ListHeader';
import './list.css';

export default class UsersList extends Component {
	render (){
		return (
			<div className = 'FiltListContainer'>
				{this.props.children}
			</div>
		)
	}
}

export {List, ListHeader};

