import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Loading from '../loadingIcon/loading'

import {getAllQuiz} from '../../store/actions/quizActions'

import './allQuiz.scss';

class AllQuizComponent extends Component{
    constructor(props){
        super(props);
        this.state ={name:'', description:''}
        this.getQuiz();
    }

    componentDidMount() {

      }

    getQuiz(){
        this.props.getAllQuiz();
    }

    render(){
        console.log(this.props.quizList);
        let cards_div = this.props.quizList ? this.props.quizList.map((item)=>{
            let toLink = `/challenge/${item.quizId}`;
            return (
                <div key={item.quizId} className="col s12 m6 l3">
                        <div className="card green lighten-2">
                            <div className="card-content white-text">
                            <span className="card-title">{item.name}</span>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">By {item.authorFirstName}</p>
                            </div>
                            <div className="card-action">
                                <NavLink className="menu-link" to={toLink}>More -></NavLink>
                            </div>
                        </div>
                </div>
            )
        }) : '';
           return(
               <div className="myQuiz-container">
                {this.props.loaded ? (
                    <div className="card-container container">
                        <h4 className="section-title">Quiz center</h4>
                        <p>This is your time to chanllenge quizs all around the world!</p>
                        <div className="row">
                            {cards_div}
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}  
               </div>
            
            );
        
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
      quizList: state.quiz.allQuiz,
      loaded: state.quiz.allQuiz && state.quiz.allQuiz.length > 0
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      getAllQuiz: () => {
        dispatch(getAllQuiz());
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AllQuizComponent);