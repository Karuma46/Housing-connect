import React, { Component } from 'react';
import Header from '../components/header';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import ListingComponent from '../components/listing';
import Categories from '../components/categories';
import MoveBanner from '../components/moverBanner';

class Browse extends Component {
  
  state = {
    categories : {},
    listings : []
  }
  
  
  componentDidMount(){
    this.getFeatured();
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
  
  getFeatured(){
    
    var user_id = this.getCookie('HOUSING_CONNECT_USER');
    
    if(user_id !== ''){
      //axios.get('http://localhost/housing/getFeatured/'+user_id)
      axios.get('http://api.housingconnect.co.ke/getFeatured/'+user_id)
      .then(res=>{
        //var data = JSON.parse(res.data);
        this.setState({
          listings : [...res.data]
        })
      });
      
    } else {
      //axios.get('http://localhost/housing/getFeatured')
      axios.get('http://api.housingconnect.co.ke/getFeatured')
      .then(res=>{
        this.setState({
          listings : [...res.data]
        })
      });
    }
  }
  
  saveListing = () => {
  
  }
  
  
  render() {
    this.featured = this.state.listings.map(item => (
      <ListingComponent details={item} />
    ))
    
    return (
      <div className="wrapper">
        
        <Header url={this.props.location.pathname} />
        
        <Categories />
        
        


        <section className="cols cols-4">
          <h2>Featured Listings</h2>
          
          { this.featured }
           
        </section>
      </div>
    );
  }
}

export default Browse;
