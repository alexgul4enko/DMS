import React , {Component, PropTypes} from 'react';
import ListContainer, {List, ListHeader} from '../../../components/list/ListContainer';
import UserItem from './UserItem';

export default class UsersContainer extends Component {
	render (){
		return( 
			<ListContainer>
				<ListHeader
					title = "Пользователи"
					addData = {this.adduser}
					class = "usersListHeader"
				/>
				<List
					filterPlaceHolder = "Поиск"
					renderItem = {this.renderItem}
					items = {this.props.users}
					filter = {this.filterContent}

				/>

			</ListContainer>
		)
	}
	renderItem (user,arrKey){
		return (
			<UserItem key = {user} user = {user}/>
		)
	}

	filterContent(item,filt){
		const regEx = new RegExp(filt, 'i');
		return regEx.test(JSON.stringify(item));
	}


	adduser(){
		console.log("adduser");
	}
}