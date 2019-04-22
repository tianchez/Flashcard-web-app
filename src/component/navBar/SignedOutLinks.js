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
          <li onClick={()=>dismissSideNav()}><NavLink  className="menu-link" to='/'>Home</NavLink></li>
          <li onClick={()=>dismissSideNav()}><NavLink className="menu-link" to='/signup'>Signup</NavLink></li>
          <li onClick={()=>dismissSideNav()}><NavLink  className="menu-link" to='/signin'>Login</NavLink></li>
        </ul>
    )
  }
  
}

const dismissSideNav =()=>{
  const overlay = document.getElementsByClassName("sidenav-overlay")[1];
  overlay.click();
}

export default SignedOutLinks