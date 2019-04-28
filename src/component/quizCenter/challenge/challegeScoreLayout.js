import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Loading from '../../loadingIcon/loading'
import {getScores} from '../../../store/actions/quizActions'

class ChallengeScoreLayout extends Component{
    constructor(props){
        super(props);
        this.state ={name:'', description:'', challengeState: '', cards:[]}
        this.props.getScores(this.props.quizId);
    }


    render(){
        console.log("aaaaa@@@");
        console.log(this.props);
        console.log(this.props.quiz.score);

        let score_arr = this.props.quiz.score? this.props.quiz.score.sort((a, b)=>{
            return b.score- a.score;
        }) : [];
        let score_div = score_arr.map((item, index)=>{
            return (
                <tr>
                    <td>{index+1}.</td>
                    <td>{item.name}</td>
                    <td>{item.score}</td>
                </tr>
            )
        });

        if (!this.props.loaded){
          return (<Loading />)
        }
        else{
          return(
            <div className="modal-content score-container">
                <h4>Top score</h4>
                <p>Let's see your friends' score!</p>
                <table className="score-table">
                    <tbody>
                        <tr>
                            <td>Rank</td>
                            <td>Name</td>
                            <td>Score</td>
                        </tr>
                    {score_div}
                    </tbody>
                </table>
            </div>
         );
        }
        
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
        getScores: (quizId) => {
            dispatch(getScores(quizId));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeScoreLayout);