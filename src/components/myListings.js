import React, { Component } from 'react';
import ListingComponent from './listing';
import axios from 'axios';

class MyListings extends Component {
  
  state = {
    listings : []
  }
  
  componentWillMount(){
    this.getlistings();
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
  
  getlistings(){
    var user_id = this.getCookie('HOUSING_CONNECT_USER');
    
    //axios.get('http://localhost/housing/userListings/'+user_id)
    axios.get('http://api.housingconnect.co.ke/savedListings/'+user_id)
    .then(res=>{
      //var data = JSON.parse(res.data);
      this.setState({
        listings : [...res.data.data]
      })
    });
  }
  
  
  render(){
    
    this.featured = this.state.listings.map(item => (
      <ListingComponent details={item} />
    ))
    
    return(
      <section className="cols cols-3">
        <h2>Saved Listings({this.state.listings.length})</h2>
        
        { this.featured }
        
      </section>
    )
  }
}

export default MyListings;