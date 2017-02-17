import React , {Component, PropTypes} from 'react';
export default class UserItem extends Component{
	render(){
		return (
			<section className = "userItem">
				<section className = "avatar">
				</section>
				<section className = "info">
					<span>{`${this.props.user.FirstName} ${this.props.user.LastName}`}</span>
					<span>{`логин: ${this.props.user.login}  пароль: ${this.props.user.pass}`}</span>
					<span>{ this.props.user.mail}</span>
				</section>
				<section className = "active">
				</section>
			</section>
		)
	}
}


UserItem.propTypes = {
	user : PropTypes.shape({
	    FirstName:PropTypes.string,
		LastName:PropTypes.string,
		act:PropTypes.number,
		id:PropTypes.number,
		login:PropTypes.string,
		mail:PropTypes.string,
		pass:PropTypes.string,
		photo:PropTypes.string,
  	}).isRequired,
}