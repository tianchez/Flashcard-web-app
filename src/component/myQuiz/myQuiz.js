import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {getUserQuiz, createQuiz} from '../../store/actions/quizActions'

import './myQuiz.scss';

class MyQuizComponent extends Component{
    constructor(props){
        super(props);
        this.state ={name:'', description:''}
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
      }

    addQuiz(){
        this.props.createQuiz(this.state.name, this.state.description);
    }

    getQuiz(){
        console.log("$$$");
        this.props.getQuiz();
    }

    handleChange(e){
        this.setState({
          [e.target.id]: e.target.value
        });
      }
    render(){
        console.log(this.props.quizList);
        let cards_div = this.props.quizList ? this.props.quizList.map((item)=>{
            let toLink = `/quiz/${item.quizId}`;
            return (
                <div className="col s12 m6 l3">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                            <span className="card-title">{item.name}</span>
                            <p className="card-text">{item.description}</p>
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

                <div className="card-container container">
                <h4 className="section-title">My Quiz</h4>

                    <div className="row">
                        {cards_div}
                    </div>
                    <button data-target="create-quiz-modal" className="btn modal-trigger">Create quiz</button>
                </div>


                <div id="create-quiz-modal" className="modal">
                    <div className="modal-content">
                        <h4>Create quiz</h4>
                        <p>Let's start your own quiz!</p>
                        <form className="white">
                            <div className="input-field">
                                <label htmlFor="name">Quiz name</label>
                                <input type="text" id='name' value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="description">Quiz description</label>
                                <input type="text" id='description' value={this.state.description} onChange={this.handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                    <a className="modal-close waves-effect waves-red btn-flat">Cancel</a>
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={()=>this.addQuiz()}>Create</a>
                    </div>
                </div>

               </div>
            
            );
        
    }
    
    componentDidUpdate(prevProps){    
        if (prevProps.auth != this.props.auth){
            console.log("!!!");
            console.log(this.props.auth);
            this.props.getQuiz();
        }
        // if(prevProps.authTime !== this.props.authTime && this.props.authError !== null){
        //   console.log("!!"); 
        //   console.log(this.props.authError);
        //   this.addNotification('Login Error', this.props.authError, 'danger');
        // }
    }
}

const mapStateToProps = (state) => {
    console.log("@@@");
    console.log(state);
    return{
      auth: state.firebase.auth,
      quizList: state.quiz.userQuiz
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      getQuiz: () => {
        dispatch(getUserQuiz());
      },
      createQuiz: (name, description) => {
        dispatch(createQuiz(name, description));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizComponent);