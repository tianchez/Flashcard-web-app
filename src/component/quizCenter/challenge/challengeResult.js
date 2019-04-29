import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import backgroundImage from '../../../../public/challenge-bg.jpeg'

import Loading from '../../loadingIcon/loading'
import {getQuiz, postScore} from '../../../store/actions/quizActions'
import './challengeResult.scss'

import ChallengeScoreLayout from './challegeScoreLayout'


class ChallengeResultComponent extends Component{
    constructor(props){
        super(props);
        this.state ={name:'', description:'', challengeState: '', cards:[]}
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    getQuiz(){
        // this.props.getQuiz(this.quizId);
    }

    openScore(){
        this.forceUpdate();
      }

    render(){
          return(
            <div className="challenge-container">
                <div className='overlay'>
                     <div className="color-filter" style={{backgroundColor: `${this.props.backgroundColorCode}`}} />
                 </div>
             <div className="centered-box">
             </div>
             <div className="centered-text">
                 <h4 className="title-text">Quiz is finished</h4>
                 <p>Your score is {this.props.score}</p>
                 <button className="challenge-home-button cyan accent-4"><Link to='/quiz-center'>Back</Link></button>
                 <button data-target="result-modal"  className="challenge-home-button cyan accent-4 modal-trigger" onClick={()=>this.openScore()}>Score board</button>
             </div>
             <div id="result-modal" className="modal">
                    <ChallengeScoreLayout quizId={this.props.quizId} />
                     <div className="modal-footer">
                         <a className="modal-close waves-effect waves-red btn-flat">Ok</a>
                     </div>
             </div>
            </div>
         
         );
        
        
    }
}

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth,
      quiz: state.quiz.quiz,
      profile: state.auth.userProfile,
      loaded: state.quiz.score_obj
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      getQuiz: (quizId) => {
        dispatch(getQuiz(quizId));
      },
      postScore: (quizId, score, userId, profile) => {
        dispatch(postScore(quizId, score, userId, profile));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeResultComponent);