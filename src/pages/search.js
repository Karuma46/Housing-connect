import React, { Component } from 'react';
import Header from '../components/header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListingComponent from '../components/listing';

class Search extends Component {
  
  state = {
    search : '',
    listings : []
  }
  
  
  componentWillMount(){
    this.getSearch();
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
  
  
  getSearch(){
    var q = this.props.match.params.q;
    
    //axios.get('http://localhost/housing/search/'+q)
    axios.get('http://api.housingconnect.co.ke/search/'+q)
    .then(res=>{
      this.setState({
        listings : [...res.data]
      })
    });
  }
  
  
  
  saveListing = () => {
    
  } 
  
  render() {
    this.featured = this.state.listings.map(item => (
      <ListingComponent details={item} />
    ))
    
    return (
      <div className="wrapper">

        <Header searchq={this.props.match.params.q} url={this.props.location.pathname}/>
                
        <section className="cols cols-4">
          <h2>Results</h2>
          
          { this.featured }
          
        </section>
      </div>
    );
  }
}

export default Search;
