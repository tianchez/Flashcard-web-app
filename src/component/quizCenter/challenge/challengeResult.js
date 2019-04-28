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
        console.log("qqqqq");
        console.log(this.props);
        if (this.props.score != NaN && this.props.score != undefined)
            this.props.postScore(this.props.quizId, this.props.score, this.props.auth.uid, this.props.profile);
    }

    componentDidMount() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    }

    getQuiz(){
        // this.props.getQuiz(this.quizId);
    }

    render(){
        console.log("aaaaa@@@");
        console.log(this.props);
        if (!this.props.loaded){
          return (<Loading />)
        }
        else{
          return(
            <div className="challenge-container">
                <div className='overlay'>
                     <div className="color-filter" style={{backgroundColor: `${this.props.backgroundColorCode}`}} />
                 </div>
             <div className="centered-box">
             </div>
             <div className="centered-text">
                 <h4 className="title-text">Quiz is finished</h4>
                 <button className="challenge-home-button cyan accent-4">Back</button>
                 <button data-target="challenge-modal"  className="challenge-home-button cyan accent-4 modal-trigger">Score board</button>
             </div>
             <div id="challenge-modal" className="modal">
                    <ChallengeScoreLayout quizId={this.props.quizId} />
                     <div className="modal-footer">
                         <a className="modal-close waves-effect waves-red btn-flat">Ok</a>
                     </div>
             </div>
            </div>
         
         );
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
      },
      postScore: (quizId, score, userId, profile) => {
        dispatch(postScore(quizId, score, userId, profile));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeResultComponent);