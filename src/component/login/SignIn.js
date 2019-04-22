import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { Redirect } from 'react-router-dom'

class SignInComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.signIn(this.state);
  }


  render() {
    if (this.props.auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <ReactNotification ref={this.notificationDOMRef} />
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="center red-text">
            </div>
          </div>
        </form>
      </div>
    )
  }

  componentDidUpdate(prevProps){    
    if(prevProps.authTime !== this.props.authTime && this.props.authError !== null){
      console.log("!!"); 
      console.log(this.props.authError);
      this.addNotification('Login Error', this.props.authError, 'danger');
    }
    // else if(prevProps.authTime !== this.props.authTime){
    //   console.log("@@");
    //   console.log(this.props);
    //   console.log(this.props.auth);
    //   // this.addNotification('Login successfully', '111', 'success');
    // }
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
    authError: state.auth.authError,
    auth: state.firebase.auth,
    authTime: new Date()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => {
      dispatch(signIn(creds));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent)
