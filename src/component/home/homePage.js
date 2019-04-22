import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import backgroundImage from '../../../public/home-bg.jpg'
import { connect } from 'react-redux'
import './homePage.scss';

class HomePageComponent extends Component{
    constructor(props){
        super(props);
		  console.log("!@!!!#");

    }

    componentDidMount(){
        
    }
    render(){
        let start_button_link = this.props.auth.uid ? '/myquiz': '/signin';
           return(
               <div className="home-container">
                <img className="home-bg-img" src={backgroundImage} alt="backgroundImage" />
                <div className="centered-box">
                </div>
                <div className="centered-text">
                    <h2 className="title-text">QuizMe</h2>
                    <p className="description-text">Create flashcards and quiz your friends!</p>
                    <button className="start-button cyan accent-4"><Link to={start_button_link}>Get started</Link></button>
                </div>
               </div>
            
            );
        
    }  
}

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth,
    }
  }

export default connect(mapStateToProps)(HomePageComponent);