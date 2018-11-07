import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {
  
  state = {
    email : '',
    password : ''
  }
  
  componentWillMount(){
   this.checkLoggedIn();
  }
    
  checkLoggedIn(){
    var loggedin = this.getCookie('HOUSING_CONNECT_USER');
    if(loggedin === ''){
      
    } else {
      window.location.href = '/';
    }
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
  
  handleEmail = e => {
    this.setState({
      email : e.target.value
    })
  }
  
  handlePass = e => {
    this.setState({
      password : e.target.value
    })
  }
  
  makePayload(){
    var body = {
      operation : 'login',
      user : {
        email : this.state.email,
        password : this.state.password
      }
    }
    
    return JSON.stringify(body);
  }
  
  handleSubmit = e => {
    e.preventDefault();
    // send login credentials
    
    var payload = this.makePayload();
    
    if(this.state.email === '' || this.state.password === ''){
      document.getElementById('errorDiv').innerText = 'Fill in all the fields and try again!';
    } else {
      document.getElementById('subBtn').disabled = true;
      document.getElementById('subBtn').innerText = 'Signing in...';
      //axios.post('http://localhost/housing/',payload)
      axios.post('http://api.housingconnect.co.ke/',payload)
        .then(res=>this.handleResult(res.data));
    }
    
  }
  
  handleResult = res =>{
    //var result = JSON.parse(res);
    if(res.result === 'fail'){
      this.setState({
        password : ''
      });
      
      document.getElementById('subBtn').disabled = false;
      document.getElementById('errorDiv').innerText = res.message;
    } else {
      document.getElementById('errorDiv').innerText = res.message;
      this.setCookie(res.data);
      
      setTimeout(()=>{
        window.location.href = '/';
      },500)
    }
  }
  
  
  setCookie(content){
    var cname = 'HOUSING_CONNECT_USER';
    var cvalue = content;
    var exdays = '30';
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  render() {
    return (
      <div className="wrapper-landing">
      
        <div className="logo">
          <img src="img/logo.svg" alt=""/>
        </div>
        
        <div className="bgDiv">
          <img src="img/bg.jpg" alt=""/>
        </div>
        
        <div className="signupBox">
            <div className="signup-left">
              <h1>Hey there!  House  it  going? </h1>
            </div>
            <div className="signup-right">
              <form onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                
                <div className="inputDiv">
                  <label className="label1" htmlFor="email"><i className="material-icons">person</i></label>
                  <input type="text" id="Email" className="input1" placeholder="Email Address" value={this.state.email} onChange={this.handleEmail}/>
                </div>
                
                <div className="inputDiv">
                  <label className="label1"  htmlFor="password"><i className="material-icons">lock</i></label>
                  <input type="password" id="password" className="input1" placeholder="Password" value={this.state.password} onChange={this.handlePass}/>
                </div>
                
                <p id="errorDiv"></p>
                <button className="btn" id="subBtn">Sign in</button>
                <p>Not a member? <Link to="/register">Register Here</Link></p>
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;
