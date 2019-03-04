import React, { Component } from 'react';
import Header from '../components/header';
import MyListings from '../components/myListings';
import axios from 'axios';
import UpdateProfile from '../components/updateProfile';
import { Link } from 'react-router-dom';

class Me extends Component {
  
  state = {
    profile : {
      first_name : '',
      last_name : ''
    },
    profileImg: '',
    img_url : ''
  }
  
  componentWillMount() {
    this.getProfile();
    
  }
  
  componentDidMount(){
    //this.getProfilePic();
  }
  
  getProfile(){
    var id = this.getCookie('HOUSING_CONNECT_USER');
    //axios.get(`http://localhost/housing/profile/`+id)
    axios.get(`http://api.housingconnect.co.ke/profile/`+id)
    .then(res => (
      this.setState({
        profile : {...res.data}
      })
    ))
  }
  
  setProfilePic = (e) =>{
    
    var input = document.getElementById('profileImg');
    if (input.files && input.files[0]) {
    
    this.setState({
      img : e.target.files[0]
    })
      
     var reader = new FileReader();
     
     reader.onload = e => {
      this.setState({
        profileImg : e.target.result
      })
     }
     reader.readAsDataURL(input.files[0]);
   }
   
   document.getElementById('avatar-popup-wrap').style.display = 'block';
  }
  
  handleUrl = e => {
    this.setState({
      img_url : e.target.value
    })
    document.getElementById('avatar-popup-wrap').style.display = 'block';
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
    return (
      <div className="wrapper">
        
        <Header />
        
        <UpdateProfile image={this.state.img_url} />
        
        <div className="profile-banner">
          <div id="profile-avatar">
            <div id="my-avatar">
              <img src="" alt=""/>
              <div id="setProfileForm">
                <label htmlFor="profileImg">Upload Avatar</label>
                <input id="profileImg" type="file" accept="image/*" value={this.state.img_url} onChange={this.handleUrl} />
              </div>
            </div>
            <h1>{this.state.profile.first_name +` `+ this.state.profile.last_name}</h1>
          </div>
          <div id="account-links">
            <ul>
              {/* <li> <Link to="">My Listings </Link></li>
              <li> <Link to="">Saved Listings </Link></li>
              <li><Link to=""> Edit Profile </Link></li> */}
              {/*<li>My Messages(1)</li>*/}
            </ul>
          </div>
        </div>
        
        <MyListings />

      </div>
    );
  }
}

export default Me;
