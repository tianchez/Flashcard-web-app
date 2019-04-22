import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {getCards, getQuiz} from '../../store/actions/quizActions'
import './quizView.scss';

class QuizViewComponent extends Component{
    constructor(props){
      super(props);
      this.quizId = this.props.match.params.quizId;
      console.log(this.quizId);
      this.state= {editButton_text: 'Edit'}
      // this.props.getQuiz(this.quizId);
    }

    componentDidMount(){
        
    }

    editButtonClicked(){
      this.setState({editButton_text: this.state.editButton_text === 'Edit' ? 'Save' : 'Edit'})
      console.log(this.state.editButton_text);
    }

    render(){
      console.log("!@#");
      console.log(this.props);
      console.log(this.props.quiz);

      let term_card = (
        <div className="card-view">
                    {this.state.editButton_text === 'Edit'? (<p className="term-text">Term</p>)
                    : (<input className="term-input" type="text"/>)}
                    {/* <p className="description-text">Create flashcards and quiz your friends!</p>
                    <button className="start-button cyan accent-4">Get started</button> */}
          </div>
      )

           return(
               <div className="quizView-container container">
                <h4>test1</h4>
                <p className="quiz-description">tes2</p>
                 {/* <h4>{this.props.quiz ? this.props.quiz.name : ''}</h4>
                 <p>{this.props.quiz ? this.props.quiz.description : ''}</p> */}
                 <div className="card-container">
                  <div className="card-navigator">
                    <i class="material-icons">chevron_left</i><span>20/20</span><i class="material-icons">chevron_right</i>
                  </div>
                  <i class="material-icons">screen_rotation</i>
                  <div className="card-wrapper">
                    {term_card}
                  </div>
                 </div>
                 <button onClick={()=>this.editButtonClicked()}>{this.state.editButton_text}</button>
               </div>
            
            );
        
    }  
}

const mapStateToProps = (state) => {
  console.log("@@@");
  console.log(state);
  return{
    auth: state.firebase.auth,
    cardList: state.quiz.quiz? state.quiz.quiz.cards : [],
    quiz: state.quiz.quiz
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (quizId) => {
      dispatch(getCards(quizId));
    },
    getQuiz: (quizId) => {
      dispatch(getQuiz(quizId));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizViewComponent);