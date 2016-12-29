
import React, {PropTypes, Component} from 'react';
import Input from 'react-toolbox/lib/input';
import './reject.css'





export default class Reject_Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value :""
    }
    if(props.lastAns && props.lastAns.ans && props.lastAns.rej){
      this.state.value = props.lastAns.ans;
    }
    this.saveanswer  = this.saveanswer.bind(this);
    this.returnfromReject  = this.returnfromReject.bind(this);
    this.handleChange = this.handleChange.bind(this);
   
  }
  saveanswer(){
    if (!this.state.value){
      this.props.showDialog("Поле не может быть пустым");
      return;

    }
    else if(this.state.value == "-"){
      this.props.showDialog("Значение '-' не допустимо");
      return;
    }
    this.props.saveanswer(this.state.value);
  }
  returnfromReject(){
    this.props.returnfromReject();
  }

  handleChange(evt){
    this.setState({value: evt});
    // let value = evt.target.value;
    // console.log(value);
  }
  render() {
    return (
          	<div className="Dialog reject" >
   
               <Input type='text' 

                           label='Введите причину либо свой вариат' 
                           value={this.state.value} 
                           onChange={this.handleChange}  />
               <div className="buttons">
                  <div className="material-icons reject" onClick = {this.returnfromReject }>keyboard_arrow_left</div>
                  <div className="material-icons check" onClick = {this.saveanswer} >check</div>
               </div>
            </div>	
    );
  }


}
