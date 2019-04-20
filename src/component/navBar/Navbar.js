import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'


class NavbarComponent extends Component{
  constructor(props){
    super(props); 
  }

  render(){
    this.links = this.props.auth.uid ? <SignedInLinks profile={this.props.profile} /> : <SignedOutLinks />;

    return (
      <nav className="nav-wrapper cyan accent-4">
        <div className="container">
          <Link to='/' className="brand-logo">Flashcard</Link>
          {this.links}
        </div>
      </nav>
    )
  }

}


const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(NavbarComponent)
