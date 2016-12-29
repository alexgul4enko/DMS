import React , { Component  } from 'react'



export default function  ImageDropPromt (props){
	return (
				<div className = "imageDropDialog"> 
					<h1>Удалить фото?</h1>
					<img src = {props.img_url}/>
					<div className = "box">
						<div className="material-icons no"
									onClick={props.close}>highlight_off</div>
						<div className="material-icons yes"
									onClick={props.dropImageFromDB}>done</div>

					</div>

				</div>

			)
} 



