import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  if (!props.mobile){
    return (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><NavLink  className="menu-link" to='/create'>New Project</NavLink></li>
          <li><a onClick={props.signOut}>Log Out</a></li>
          <li><NavLink  className="menu-link" to='/' className="btn btn-floating pink lighten-1">
            {props.profile.initials}
          </NavLink></li>
        </ul>
      </div>
    )
  }
  else{
    return (
        <ul>
          <li><NavLink  className="menu-link" to='/'>Home</NavLink></li>
          <li><NavLink  className="menu-link" to='/create'>New Project</NavLink></li>
          <li><a onClick={props.signOut}>Log Out</a></li>
          <li><NavLink  className="menu-link" to='/' className="btn btn-floating pink lighten-1">
            {props.profile.initials}
          </NavLink></li>
        </ul>
    )
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
