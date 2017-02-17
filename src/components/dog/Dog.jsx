import React from 'react';
import './dog.css';
const Dog =  props=>{
	return (
		<div className = "dogPlayGround">
			<div className="dog">
				<div className="dog-body">
			    	<div className="dog-tail">
			      		<div className="dog-tail">
			        		<div className="dog-tail">
			          			<div className="dog-tail">
			            			<div className="dog-tail">
			              				<div className="dog-tail">
			                				<div className="dog-tail">
			                  					<div className="dog-tail"></div>
			                				</div>
			              				</div>
			            			</div>
			          			</div>
			        		</div>
			      		</div>
			    	</div>
			  	</div>
			  	<div className="dog-torso"></div>
			  	<div className="dog-head">
			    	<div className="dog-ears">
						<div className="dog-ear"></div>
						<div className="dog-ear"></div>
					</div>
					<div className="dog-eyes">
						<div className="dog-eye"></div>
						<div className="dog-eye"></div>
					</div>
					<div className="dog-muzzle">
						<div className="dog-tongue"></div>
					</div>
				</div>
			</div>
			<div className="ball" tabIndex="0"></div>
		</div>
	)
}

export default Dog;

