import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import HomePageComponent from './home/homePage'
import NavbarComponent from './navBar/Navbar'

import SignUpComponent from './login/SignUp'
import SignInComponent from './login/SignIn'

import MyQuizComponent from './myQuiz/myQuiz'
import QuizViewComponent from './myQuiz/quizView'

import AllQuizComponent from './quizCenter/allQuiz'
import ChallengeHomeComponent from './quizCenter/challenge/challengeHome'
import ChallengeViewComponent from './quizCenter/challenge/challengeView'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: ""
        };
    }

    render () {
        return (
            <Router>
                <div className="App">
                    <NavbarComponent />
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/home" />)}/>
                        <Route path="/home" component={HomePageComponent} />
                        <Route path="/signup" component={SignUpComponent} />
                        <Route path="/signin" component={SignInComponent} />
                        <Route path="/myquiz" component={MyQuizComponent} />
                        <Route path="/quiz/:quizId" component={QuizViewComponent} />
                        <Route path="/quiz-center" component={AllQuizComponent} />
                        <Route path="/challenge/:quizId" component={ChallengeHomeComponent} />
                        <Route path="/test/:quizId/:cardId" component={ChallengeViewComponent} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;