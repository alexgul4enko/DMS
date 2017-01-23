import React , {Component, PropTypes} from 'react'
import PrActionsRows from './PrActionsRows';


export default class   ProductComponent  extends  Component {
	constructor(props){
		super(props);
		this.state = {
			tongles : true,
		}
		this.tongling = this.tongling.bind(this);
		

	}

	

	tongling(){
		this.setState({tongles: !this.state.tongles});
	}

	render(){
		return(
			<div className = "ActionsProduct" style={{backgroundColor:`RGB(${this.props.color})`}}>
				<div className = "prodDataMain" onClick = {this.tongling}>
					<div className = "wrapProdImage">
					<div 
						className = "image" 
						style = {{"backgroundImage" :`url(/Image/${this.props.pic})`}}
					>
					</div>
					</div>

					<span>
						{this.props.name}
					</span>
				</div>

				<div className = "ActionsData">
					{
						this.state.tongles ? 
						this.props.actions.map(act=>{
							const {quest,id,answer} = act
							return <PrActionsRows 
										key = {id}
										act = {act}
										openDialog = {this.props.openDialog}
										question = {quest}
										answered = {answer ? true : false}
									/>
						}) : null
					}
				</div>


			</div>
		)
	}
	
}
ProductComponent.defaultProps = {
	color : '92,106,112',
	
}
ProductComponent.propTypes = {
	color:PropTypes.string
}




