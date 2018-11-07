import React, { Component } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  state = {
    first_name : '',
    last_name : '',
    email : '',
    password : '',
    password2 : ''
  }
  
  handleFname = e => {
    this.setState({
      first_name : e.target.value
    })
  }
  
  handleLname = e => {
    this.setState({
      last_name : e.target.value
    })
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
  
  handlePass2 = e => {
    this.setState({
      password2 : e.target.value
    })
  }
  
  makePayload(){
    var body = {
      operation : 'register',
      user : {
        first_name : this.state.first_name,
        last_name : this.state.last_name,
        email : this.state.email,
        password : this.state.password
      }
    }
      
    return JSON.stringify(body);
  }
  
  handleSubmit = e =>{
    e.preventDefault();
    
    var payload = this.makePayload();
    
    if(this.state.password !== this.state.password2){
      document.getElementById('errorDiv').innerText = 'Passwords do not match!';
    } else {
      document.getElementById('subBtn').disabled = true;
      document.getElementById('subBtn').innerText = 'Signing up...'
      //axios.post('http://localhost/housing/',payload)
      axios.post('http://api.housingconnect.co.ke/',payload)
        .then(res=>this.handleResult(res.data));
    }
  }
  
  handleResult = res => {
    if(res.result === 'fail'){
      document.getElementById('errorDiv').innerText = res.message;
      document.getElementById('subBtn').disabled = false;
    } else {
      document.getElementById('errorDiv').innerText = res.message;
      
      this.setCookie(res.data);
      
      setTimeout(()=>{
        window.location.href = '/';
      },3000);
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
      <div className="wrapper">
      
        <Header />
                
        <section className="register-form">
          
          <h1>REGISTER</h1>
          
          <p>Welcome to Housing Connect</p>
          
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="input2" placeholder="First name" value={this.state.first_name} onChange={this.handleFname} required/>
            <input type="text" className="input2" placeholder="Last name" value={this.state.last_name} onChange={this.handleLname} required/>
            <input type="text" className="input2" placeholder="Email address" value={this.state.email} onChange={this.handleEmail} required/>
            <input type="password" className="input2" placeholder="Password" value={this.state.password} onChange={this.handlePass} required/>
            <input type="password" className="input2" placeholder="Confirm password" value={this.state.password2} onChange={this.handlePass2} required/>
            <p id="errorDiv"></p>
            <button className="btn" id="subBtn">REGISTER</button>
            <p>Already a member? <Link to="/login">Sign In Here</Link></p>
          </form>
        </section>
        
      </div>
    );
  }
}

export default Register;
