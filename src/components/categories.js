import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Categories extends Component{
  
  state = {
    categories : {}
  }
  
  
  componentWillMount(){
    this.getCategories();
  }
  
  
  getCategories(){
    //axios.get('http://localhost/housing/categories')
    axios.get('http://api.housingconnect.co.ke/categories')
    .then(res=>{
      this.setState({
        categories : {...res.data}
      })
    });
  }
  
  
  render(){
    return(
      <section className="cols cols-4">
        <h2 className="section-title">Explore</h2>
        
          <div className="items category">
            <img src="img/apartments.jpg" alt=""/>
            <Link to="search/apartments"><h3>Apartments ({this.state.categories.Apartments})</h3></Link>  
          </div>
              
          
          <div className="items category">
            <img src="img/houses.jpg" alt=""/>
            <Link to="search/houses"><h3>Houses ({this.state.categories.Houses})</h3></Link>
          </div>
                
        
          <div className="items category">
            <img src="img/offices.jpg" alt=""/>
            <Link to="search/offices"><h3>Offices ({this.state.categories.Offices})</h3></Link>
          </div>
          
        
          <div className="items category">
            <img src="img/land.jpg" alt=""/>
            <Link to="search/land"><h3>Land ({this.state.categories.Land})</h3></Link>
          </div>
          

          <div className="items category">
            <img src="img/hotels.jpg" alt=""/>
            <Link to="search/hotels"><h3>Hotels ({this.state.categories.Hotels})</h3></Link>
          </div> 
                  
      </section>
    )
  }
}

export default Categories;