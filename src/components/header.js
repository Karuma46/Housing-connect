import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';

class Header extends Component {
  state = {
    isLoggedIn : false,
    searchq : '',
    url: ''
  }
  
  componentWillMount(){
    this.checkLoggedIn();
  }
  
  componentWillReceiveProps(){
    var q = this.props.searchq;
    var url = this.props.url;
    
    this.setState({
      searchq : q,
      url : url
    })
  }
  
  showDropdown = () =>{
    document.getElementById('dropdown').style.display = 'block';
  }
  
  handleSearch = e =>{
    this.setState({
      searchq : e.target.value
    })
  }
  
  handleSubmit = e =>{
    e.preventDefault();
    var path = this.state.url;
    var arr = path.split("/");
    if(arr[1] === 'search'){
      window.location.href = 'search/'+this.state.searchq;
    } else {
      window.location.href = 'search/'+this.state.searchq;
    }
    console.log(arr);
    //window.location.href = 'search/'+this.state.searchq;
  }
  
  checkLoggedIn(){
    var loggedin = this.getCookie('HOUSING_CONNECT_USER');
    if(loggedin === ''){
      this.setState({
        isLoggedIn : false
      })
    } else {
      this.setState({
        isLoggedIn : true
      })
    } 
  }
  
  logout = () =>{
    document.cookie = "HOUSING_CONNECT_USER=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    window.location.href = '/';
  }
  
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
  
  render() {
    
    if(this.state.isLoggedIn === false){
      this.topRight = 
        <div className="sign-in-links">
          <span><Link to="/login">Sign In</Link></span>
          <span><Link to="/register">Register</Link></span>
        </div>;
    } else {
      this.topRight =
      <span className="rightWrap">
        {/* <span className="mobile">
          <i className="material-icons">add</i>
        </span>
        
        <span className="mobile">
          <i className="material-icons">search</i>
        </span> */}
        
        {/* <span className="user-avatar" onClick={this.showDropdown}>
          <i className="material-icons">person</i>
        </span> */}

        <div className="sign-in-links">
          {/* <span><Link to="/new">Add a listing</Link></span>
          <span><Link to="/me">Saved Listings</Link></span> */}
          <span><Link to="/me">My account</Link></span>
          <span onClick={this.logout} >Logout</span>
        </div>

      </span>
    };
  
    
    return (
      <header>
      
        <div className="left-header">
        <Link to="/">
          <div className="header-logo">
              <img src={ Logo } alt=""/>
          </div>
        </Link>  
          
            
            
          <div className="search-box">
            <form onSubmit={this.handleSubmit}>
              <span><i className="material-icons">search</i></span>
              <input type="text" value={this.state.searchq} onChange={this.handleSearch} placeholder="Search Locations e.g : 'Thika'"/>
            </form>
          </div>
         

        </div>
        
        <div className="right-header">
          
          { this.topRight }
          
          <div className="drop-menu" id="dropdown">
            <ul>
              {/* <li><Link to="/new">Add new listing</Link></li> */}
              <li><Link to="/me">My Account</Link></li>
              {/* <li>Saved Listings</li> */}
              {/*<li><Link to="/inbox">Messages</Link></li>*/}
              <li onClick={this.logout}>Sign out</li>
            </ul>
          </div>
        </div>
        
      </header>
    );
  }
}

export default Header;
