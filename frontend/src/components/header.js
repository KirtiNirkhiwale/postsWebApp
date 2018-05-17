import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedin: false } ;
  }
  componentWillMount(){
    let username = localStorage.getItem('username');
    if(username) {
      this.setState({
        isLoggedin: true,
      })
    }
  }

  logout() {
    localStorage.removeItem('username');    
    setTimeout(function(){ window.location.reload(); }, 1000);   
    this.props.history.push('/');
  }

  render() {
    let UserMenu = "";
    if(this.state.isLoggedin) {
      UserMenu = () =>( 
        <div className="row col-xs-12 col-sm-6 col-lg-6">
          <div className="col-xs-12 col-sm-3 col-lg-3">
            <Link to="/allPosts">All Posts</Link>
          </div>
          <div className="col-xs-12 col-sm-3 col-lg-3">
            <Link to="/addPost">Add New</Link>
          </div>
          <div className="col-xs-12 col-sm-3 col-lg-3">
            <Link to="/" onClick={this.logout} >Logout</Link> 
          </div>
        </div> 
      );     
    } else {
      UserMenu = () =>( 
        <div className="row col-xs-12 col-sm-6 col-lg-6">
          <div className="col-xs-12 col-sm-6 col-lg-6"></div>
          <div className="col-xs-12 col-sm-6 col-lg-3">
            <Link to="/register">Register</Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-3">
            <Link to="/">Login</Link> 
          </div>
        </div> 
      );
    }
    return (
      <header className="header" >
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-lg-6"></div>
            <UserMenu />
        </div>
      </header>
    )
  }
}

export default Header;