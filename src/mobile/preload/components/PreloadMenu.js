import React , {Component} from 'react'


class PreloadMenu extends Component{
	render (){
		return (
				<div className = "Preload">
					<div className = "Buttons">
						{this.props.goApp ?
							<div 
								className = "buts" 
								onClick={this.props.toApp}>
									Продолжить
							</div> :
							<div className = "goApp buts">Продолжить</div> 

						}
						<div 
							className = "buts" 
							onClick={this.props.toLoad}>
								Синхронизироваться
						</div>
					</div>

				</div>
		)
		
	}

	dropDB(){
		window.indexedDB.deleteDatabase("DMSMobile");
	}
}

export default PreloadMenu;