import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = (props) => {
  if (!props.mobile){
    return (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><NavLink className="menu-link" to='/signup'>Signup</NavLink></li>
          <li><NavLink  className="menu-link" to='/signin'>Login</NavLink></li>
        </ul>
      </div>
    )
  }
  else{
    return (
        <ul>
          <li><NavLink  className="menu-link" to='/'>Home</NavLink></li>
          <li><NavLink className="menu-link" to='/signup'>Signup</NavLink></li>
          <li><NavLink  className="menu-link" to='/signin'>Login</NavLink></li>
        </ul>
    )
  }
  
}

export default SignedOutLinks