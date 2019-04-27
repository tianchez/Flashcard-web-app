import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { getInitial } from '../../store/actions/authActions'

import M from "materialize-css/dist/js/materialize.min.js";
import './Navbar.scss';


class NavbarComponent extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
        edge: "left",
        inDuration: 250
    });
  }

  render(){
    console.log("###");
    console.log(this.props);
    if (this.props.auth.uid && !this.props.profile){
      this.props.getInitial(this.props.auth.uid);
    }
    this.desktop_links = this.props.auth.uid ? <SignedInLinks profile={this.props.profile} mobile={false} /> : <SignedOutLinks mobile={false}/>;
    this.mobile_links = this.props.auth.uid ? <SignedInLinks profile={this.props.profile} mobile={true} /> : <SignedOutLinks mobile={true}/>;


    return (
      <div className="nav-bar">
        <nav className="nav-wrapper cyan accent-4">
          <div className="container">
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i></a>
            <Link to='/' className="brand-logo"><h3>QuizMe</h3></Link>
            {this.desktop_links}
          </div>
        </nav>
        <div className="sidenav" id="mobile-demo">
          {this.mobile_links}
        </div>
      </div>

    )


  }

}

const mapStateToProps = (state) => {
  console.log("!!!!!!!!!");
  console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.auth.userProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitial: (userid) => {
      dispatch(getInitial(userid));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)
