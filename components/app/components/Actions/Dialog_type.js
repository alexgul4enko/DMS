
import React, {PropTypes, Component} from 'react';
import  './dialogs.css'
import CheckBox_ from './CheckBox'
import RadioButtons from './RadioButtons'
import YesNo from './YesNo'
import SliderBar from './SliderBar'
import Starts from './Starts'
import Text from './Text'


export default class Dialog_type extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ans:""
    }
    this.setAnswer = this.setAnswer.bind(this);
    this.saveanswer = this.saveanswer.bind(this);
    this.reject = this.reject.bind(this);
    this.yesnoAnswer = this.yesnoAnswer.bind(this);
   
  }
  saveanswer(){
      if(!this.state.ans && !this.state.ans==0){
        this.props.showDialog("Выберите значение");
      }
      else {
        this.props.saveanswer(this.state.ans);
      }
  }
  reject(){
    this.props.reject();
  }

  setAnswer(ans){
    this.setState({ans:ans});
  }

  yesnoAnswer(val) {
    this.props.saveanswer(val);
  }

  render() {
    const getDialogType = () =>{
        switch(this.props.quest.act){
          case 1 :

            return <CheckBox_ 
                      variants= {this.props.quest.ans}
                      answer = { (this.props.answers && this.props.answers.ans) ? this.props.answers.ans: ""}
                      setAnswer = {this.setAnswer}
                    />
            break;
          case 2:
             return <RadioButtons 
                      variants= {this.props.quest.ans}
                      answer = { (this.props.answers && this.props.answers.ans) ? this.props.answers.ans: ""}
                      setAnswer = {this.setAnswer}
                    />
          
          case 3:
             return  <YesNo 
                          setAnswer = {this.yesnoAnswer}
                          />
          case 4:
                return <SliderBar
                          setAnswer = {this.setAnswer}
                          variants= {this.props.quest.ans}
                          answer = { (this.props.answers && this.props.answers.ans) ? this.props.answers.ans: ""}
                        />
          case 5:
                return <Starts
                          setAnswer = {this.setAnswer}
                          variants= {this.props.quest.ans}
                          answer = { (this.props.answers && this.props.answers.ans) ? this.props.answers.ans: ""}
                        />
          case 6:
                return <Text
                          setAnswer = {this.setAnswer}
                          answer = { (this.props.answers && this.props.answers.ans) ? this.props.answers.ans: ""}
                          
                        />
          
        }
    }
    return (
          	<div className="Dialog diak" >
               <h1>{this.props.quest.quest}</h1>
               {getDialogType()}
               
                  {this.props.quest.act ==3 ? 
                       <div className="buttons">
                              <div className="material-icons reject Ful" onClick = {this.reject} >clear</div>
                        </div>
                      : <div className="buttons">
                              <div className="material-icons reject" onClick = {this.reject} >clear</div>
                              <div className="material-icons check" onClick = {this.saveanswer }>check</div>
                        </div>

                  }
                  
                  
               
            </div>	
    );
  }


}