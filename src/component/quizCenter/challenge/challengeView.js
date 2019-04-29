import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import backgroundImage from '../../../../public/challenge-bg.jpeg'
import ReactNotification from "react-notifications-component";


import Loading from '../../loadingIcon/loading'
import {getQuiz, postScore} from '../../../store/actions/quizActions'
import ChallengeResultComponent from './challengeResult'
import './challengeView.scss'


const backgoundFilterColor = ['#146105', '#276304', '#3D6504', '#536804', '#6A6A04', '#6D5704', '#6F4304', '#722E04', '#741704', '#770408'];

class ChallengeViewComponent extends Component{
    constructor(props){
        super(props);
        let cardList = this.props.cardList.map(item=>{
            var shuffle = function (array) {
                var currentIndex = array.length;
                var temporaryValue, randomIndex; 
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
            
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            };

            let choices = [...item.similarWords, item.term];
            item.similarWords = choices;
            return item;
        });
        this.state ={curr_card_index: 0, choice_selected: false, cardList: cardList, correct_ans: 0};

        this.choiceSelected = this.choiceSelected.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();

    }

    componentDidMount() {
    //   var elems = document.querySelectorAll('.modal');
    //   var instances = M.Modal.init(elems);
    }

    getQuiz(){
        // this.props.getQuiz(this.quizId);
    }

    choiceSelected(e){
        let clicked_button = e.target;
        let correct_num = this.state.correct_ans;
        if (!clicked_button.className.includes('correct')){
            clicked_button.className += ' wrong-choice';
            this.addNotification('Wrong!', 'Your choice is not correct', 'danger');
        }
        else{
            this.addNotification('Bingo!', 'Your answer is correct', 'success');
            correct_num++;
        }

        // Go to next page
        this.setState({choice_selected: true, correct_ans: correct_num}, ()=>{
            if (this.state.curr_card_index === this.state.cardList.length-1){
                let score = this.state.correct_ans / this.state.cardList.length;
                this.props.postScore(this.props.quizId, score, this.props.auth.uid, this.props.profile);
            }

            setTimeout(()=>{
                clicked_button.className = 'choice-button';
                this.setState({choice_selected :false, curr_card_index: this.state.curr_card_index+1});
            }, 3000);
        });
    }

    render(){
      
        let description_card = ()=> {
            let index = this.state.curr_card_index;
            let curr_card = this.state.cardList[index];

            return (
            <div className="card-view back-card-view">
                    <pre className="card-description-text">{curr_card.description}</pre>
                    {curr_card.imageURL ? <img className="card-image" src={curr_card.imageURL}/>:''}
            </div>
            )
        }

        let choices_div = ()=>{
            let index = this.state.curr_card_index;
            let curr_card = this.state.cardList[index];

            let similarWords_div = curr_card.similarWords.map((item, index)=>{
                if (item !== curr_card.term){
                    return (
                        <button key={`chocie-${index}`} className="choice-button" onClick={this.choiceSelected}>{item}</button>
                    )
                }
                else{
                    let choice_className = `choice-button ${this.state.choice_selected? 'correct-choice' : 'correct'}`;
                    return (
                        <button key={`chocie-${index}`} className={choice_className} onClick={this.choiceSelected}>{item}</button>
                    )
                }
            });

            return (
                <React.Fragment>
                    {similarWords_div}
                </React.Fragment>
            )
        }

        let wrong_rate = 1- this.state.correct_ans.toFixed(2) / (this.state.choice_selected ? this.state.curr_card_index+1 :this.state.curr_card_index);
        let color_index = Math.floor(wrong_rate*10);
        let backgroundColorCode = this.state.curr_card_index === 0 && this.state.choice_selected === false ? (backgoundFilterColor[0]) :(backgoundFilterColor[color_index-1]);

        if (this.state.curr_card_index < this.state.cardList.length){
            return(
                <div className="challenge-container">
                 <ReactNotification ref={this.notificationDOMRef} />
                 <div className='overlay'>
                     <div className="color-filter" style={{backgroundColor: `${backgroundColorCode}`}} />
                 </div>
                 <div className="card-container">
                       <h2 className="title-text" style={{margin: 0}}>{this.props.name}</h2>
                       <p className="description-text">{this.props.description}</p>
                       <div className="card-navigator">
                         <span className="card-navigation-text">Progress: {this.state.curr_card_index +1}/{this.state.cardList.length}</span>
                         <span className="card-navigation-text">Correct: {this.state.correct_ans}</span>
                       </div>
                       {description_card()}
                       <div className="choices-container">
                         {choices_div()}
                       </div>
                   </div>
                </div>
             
             );
        }
        else{
            return (<ChallengeResultComponent quizId={this.props.quizId} score={Math.floor(this.state.correct_ans / this.state.cardList.length*100)} backgroundColorCode={backgroundColorCode}/>);

        }
        
    }
    
    componentDidUpdate(prevProps){    
        if (prevProps.auth != this.props.auth){
            this.getQuiz();
        }
    }

    addNotification(title, msg, type) {
        this.notificationDOMRef.current.addNotification({
          title: title,
          message: msg,
          type: type,
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }
}

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth,
      quizList: state.quiz.allQuiz,
      loaded: state.quiz.allQuiz && state.quiz.allQuiz.length > 0,
      profile: state.auth.userProfile
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      getQuiz: (quizId) => {
        dispatch(getQuiz(quizId));
      },
      postScore: (quizId, score, userId, profile) => {
        dispatch(postScore(quizId, score, userId, profile));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeViewComponent);