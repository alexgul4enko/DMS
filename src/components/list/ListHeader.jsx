import React , {Component, PropTypes} from 'react';


export default class ListHeader extends Component{
	constructor(props){
		super(props);
		this.state = {
			editing: false,
		}

		this.renderEdit = this.renderEdit.bind(this);
		this.renderTask = this.renderTask.bind(this);
		this.renderDelete = this.renderDelete.bind(this);
		this.edit = this.edit.bind(this);
		this.lostFocus = this.lostFocus.bind(this);
		this.checkEnter = this.checkEnter.bind(this);
		this.finishEdit = this.finishEdit.bind(this);
		this.addButtonRender = this.addButtonRender.bind(this);

	}
	render(){
		return(
			<div className = {`FiltListHeader ${this.props.class}`}>
				{this.addButtonRender()}
				{
					this.props.onHeaderChanged ? 
						 this.state.editing ? this.renderEdit()  : this.renderTask()
						 : this.renderTask()
				}
				{this.renderDelete()}
			</div>
		)
	}

	addButtonRender(){
		if(!this.props.addData) return null;
		return <button className='add' onClick={this.props.addData}>+</button>;
	}

	renderEdit(){
		return <input 
					type='text'
					autoFocus = {true}
					defaultValue = {this.props.title}
					onBlur = {this.lostFocus}
					onKeyPress={this.checkEnter} 
				/>
	}

	renderTask (){
		return (<div onClick={this.edit}>
					<span 
						className='title'
						onClick = {this.edit}
					>
						{this.props.title}
					</span>
				</div>);
	}

	renderDelete(){
		if(!this.props.onDelete) return null;
		return <button className='delete' onClick={this.props.onDelete}>x</button>;
	}
	lostFocus(e){
		this.finishEdit(e);
	}
	checkEnter(e){
		if (e.key === 'Enter'){
			this.finishEdit(e);
		}
	}
	finishEdit(e){
		this.props.onHeaderChanged(e.target.value);
		this.setState({editing:false});
	}

	edit(){
		this.setState({editing:true});
	}

	

}

ListHeader.defaultProps = {
	class:'',
	title: ''
}

ListHeader.propTypes = {
	class : PropTypes.string,
	title : PropTypes.string,
	onDelete : PropTypes.func,
	onHeaderChanged: PropTypes.func,
	addData : PropTypes.func,
}