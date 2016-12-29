import React, {Component} from 'react';
import './loading.css'


export default function  Loading (props){
	return (
		<div className = "loadingWait">
			<div className = "cc">
				<h1>Загружаю...</h1>
				<div className="spinner"></div>
			</div>
		</div>
	)
}