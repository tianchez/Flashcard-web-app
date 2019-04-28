import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import backgroundImage from '../../../../public/challenge-bg.jpeg'

import Loading from '../../loadingIcon/loading'
import {getQuiz} from '../../../store/actions/quizActions'
import './challengeHome.scss'

import ChallengeViewComponent from './challengeView'
import ChallengeScoreLayout from './challegeScoreLayout'

class ChallengeHomeComponent extends Component{
    constructor(props){
        super(props);
        this.state ={name:'', description:'', challengeState: '', cards:[]}
        this.quizId = this.props.match.params.quizId;
        this.getQuiz();
    }

    componentDidMount() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    }

    getQuiz(){
        this.props.getQuiz(this.quizId);
    }

    startTest(){
      let cards = this.props.quiz.cards.filter(item=>{
        return item.similarWords.length > 0;
      });
      console.log("zzzz");
      console.log(cards);
      this.setState({challengeState: 'started', cards: cards});
    }

    render(){
        console.log("aaaaa@@@");
        console.log(this.props);
        if (!this.props.loaded){
          return (<Loading />)
        }
        else if (!this.state.challengeState){
          return(
            <div className="challenge-container">
             <img className="home-bg-img" src={backgroundImage} alt="backgroundImage" />
             <div className="centered-box">
             </div>
             <div className="centered-text">
                 <h2 className="title-text">{this.props.quiz? this.props.quiz.name :''}</h2>
                 <p className="description-text">{this.props.quiz? this.props.quiz.description :''}</p>
                 <button className="challenge-home-button cyan accent-4" onClick={()=>this.startTest()}>Get started</button>
                 <button data-target="challenge-modal"  className="challenge-home-button cyan accent-4 modal-trigger">Score board</button>
             </div>
             <div id="challenge-modal" className="modal">
                     <ChallengeScoreLayout quizId={this.quizId} />
                     <div className="modal-footer">
                         <a className="modal-close waves-effect waves-red btn-flat">Ok</a>
                     </div>
             </div>
            </div>
         
         );
        }
        else if (this.state.challengeState === 'started'){
          return(
            <ChallengeViewComponent cardList={this.state.cards} quizId={this.quizId} name={this.props.quiz.name} description={this.props.quiz.description}/>
          )
        }
        
    }
    
    componentDidUpdate(prevProps){    
        if (prevProps.auth != this.props.auth){
            this.getQuiz();
        }
    }
}

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth,
      quiz: state.quiz.quiz,
      profile: state.auth.userProfile,
      loaded: state.quiz.quiz && state.quiz.quiz.authorId
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      getQuiz: (quizId) => {
        dispatch(getQuiz(quizId));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeHomeComponent);