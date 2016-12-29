import React, {Component, PropTypes} from 'react'
import './home.css'
import { browserHistory } from 'react-router'

class Home extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="homePage">
				<div className="material-icons" onClick={this.goHome}>home</div>
				<div className="material-icons" onClick={this.goRoutes}>map</div>
				<div className="material-icons" onClick={this.goReport}>insert_chart</div>
				<div className="material-icons" onClick={this.goDocuments}>description</div>
			</div>
		)
	}
	goHome(){
		browserHistory.goBack();
	}
	goRoutes(){
		browserHistory.push("Routes");
	}
	goReport(){
		browserHistory.push("DaylyReport");
	}
	goDocuments(){
		browserHistory.push("Documents");
	}
	componentDidMount() {
		this.props.initGpsLocations();
	}

}



export default Home;