import React , { Component } from 'react'
import FontIcon from 'react-toolbox/lib/font_icon';
import './style/ImageDrop.css'



export default function  ImageDrop (props){
	return (
				<div className = "imageDropDialog"> 
					<img src = {props.img_url}/>
					<div className = "box">
						<div className="material-icons back"
									onClick={props.close}>arrow_back</div>
						<div className="material-icons drop"
									onClick={props.switchDialog}>delete_forever</div>

					</div>

				</div>

			)
} 


