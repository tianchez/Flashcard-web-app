import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class SignUpComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this);
    this.props.signUp(this.state);
  }

  render() {
    if (this.props.auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <ReactNotification ref={this.notificationDOMRef} />
        <form className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Sign Up</button>
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
      this.addNotification('Signup Error', this.props.authError, 'danger');
    }
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
  console.log(state);
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    authTime: new Date()
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) =>{
      dispatch(signUp(creds))
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent)