import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import HomePageComponent from './home/homePage'
import NavbarComponent from './navBar/Navbar'

import SignUpComponent from './login/SignUp'
import SignInComponent from './login/SignIn'



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
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;