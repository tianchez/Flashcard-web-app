import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log("@@@@@@@@@");
  console.log(props);
  if (!props.mobile){
    return (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><NavLink  className="menu-link" to='/myquiz'>My Quiz</NavLink></li>
          <li><NavLink  className="menu-link" to='/quiz-center'>Quiz Center</NavLink></li>
          <li><a onClick={props.signOut}>Log Out</a></li>
          <li><NavLink  className="menu-link" to='/' className="btn btn-floating pink lighten-1">
            {props.profile ? props.profile.initials : ''}
          </NavLink></li>
        </ul>
      </div>
    )
  }
  else{
    return (
        <ul>
          <li onClick={()=>dismissSideNav()}><div><NavLink  className="menu-link" to='/' className="btn btn-floating pink lighten-1">
            {props.profile ? props.profile.initials : ''}
          </NavLink></div></li>
          <li onClick={()=>dismissSideNav()}><NavLink  className="menu-link" to='/'>Home</NavLink></li>
          <li onClick={()=>dismissSideNav()}><NavLink  className="menu-link" to='/myquiz'>My Quiz</NavLink></li>
          <li onClick={()=>dismissSideNav()}><NavLink  className="menu-link" to='/quiz-center'>Quiz Center</NavLink></li>
          <li ><a onClick={props.signOut}>Log Out</a></li>
        </ul>
    )
  }
}


const dismissSideNav =()=>{
  const overlay = document.getElementsByClassName("sidenav-overlay")[1];
  overlay.click();
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
