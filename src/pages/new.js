import React, { Component } from 'react';
import Header from '../components/header';
import axios from 'axios';

class New extends Component {
  state = {
    title : '',
    category : 'default',
    county : 'default',
    town : 'default',
    payMode : '',
    payPeriod : 'default',
    amount : '',
    beds : '1',
    baths : '1',
    parking : '',
    amenities : [],
    description : '',
    size: '',
    units : '',
    counties: []  
  }

  componentWillMount(){
    this.getCounties();
  }
  
  getCounties = () => {
    axios.get('http://api.housingconnect.co.ke/getCounties')
    .then(res=>{
      this.setState({
        counties : [...res.data]
      })
    })
  }
  
  handleTitle = e => {
    this.setState({
      title : e.target.value
    })
  }
    
  handleCategory = e => {
    this.setState({
      category : e.target.value
    })
    
    if(e.target.value === 'Land'){
      document.getElementById('beds-div').style.display = 'none';
      document.getElementById('baths-div').style.display = 'none';
      document.getElementById('parks-div').style.display = 'none';
      document.getElementById('amenities-div').style.display = 'none';
      document.getElementById('land-div').style.display = 'block';
    } else {
      document.getElementById('beds-div').style.display = 'block';
      document.getElementById('baths-div').style.display = 'block';
      document.getElementById('parks-div').style.display = 'block';
      document.getElementById('amenities-div').style.display = 'block';
      document.getElementById('land-div').style.display = 'none';
    }
  }
  
  handleCounty = e => {
    this.setState({
      county : e.target.value
    })
  }
  
  handleTown = e => {
    this.setState({
      town : e.target.value
    })
  }
  
  handlePaymode = e => {
    this.setState({
      payMode : e.target.value
    })
    
    if(e.target.value === 'sale'){
      document.getElementById('pay-period').style.display = 'none';
    } else {
      document.getElementById('pay-period').style.display = 'block';
    }
  }
  
  handlePayperiod = e => {
    this.setState({
      payPeriod : e.target.value
    })
  }
  
  handleAmount = e => {
    this.setState({
      amount : e.target.value
    })
  }
  
  handleTitle = e => {
    this.setState({
      title : e.target.value
    })
  }
  
  handleBeds = e => {
    this.setState({
      beds : e.target.value
    })
  }
  
  handleBaths = e => {
    this.setState({
      baths : e.target.value
    })
  }
  
  handleParking = e => {
    this.setState({
      parking : e.target.value
    })
  }
  
  handleAmenities = e => {
    var amenities = this.state.amenities;
    
    if(e.target.checked === true){
      amenities.push(e.target.value);
      
      this.setState({
        amenities : [...amenities]
      })
    } else {
      
      var index = amenities.indexOf(e.target.value);
      
      if (index > -1) {
        amenities.splice(index, 1);
        
        this.setState({
          amenities : [...amenities]
        })
      }
    }
  }
  
  handleDesc = e => {
    this.setState({
      description: e.target.value
    })
  }
  
  handleSize = e => {
    this.setState({
      size: e.target.value
    })
  }
  
  handleUnits = e => {
    this.setState({
      units: e.target.value
    })
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
  
  
  makePayload(){
    var user_id = this.getCookie('HOUSING_CONNECT_USER');
    
    if(this.state.category === 'Land'){
      var body = {
        operation : 'create_listing',
        listing : {
          user_id : user_id,
          category : this.state.category,
          title : this.state.title,
          location : this.state.town+','+this.state.county,
          amount : this.state.amount,
          mode : this.state.payMode,
          period : this.state.payPeriod,
          size : this.state.size,
          units : this.state.units,
          description : this.state.description
        }
      }
    } else {
      body = {
        operation : 'create_listing',
        listing : {
          user_id : user_id,
          category : this.state.category,
          title : this.state.title,
          location : this.state.town+','+this.state.county,
          amount : this.state.amount,
          mode : this.state.payMode,
          period : this.state.payPeriod,
          description : this.state.description,
          features : {
            bedrooms : this.state.bedrooms,
            bathrooms: this.state.bathrooms,
            parking: this.state.parking
          },
          amenities : this.state.amenities.toString()
        }
      }
    }
    
    return JSON.stringify(body);
  }
  
  handleSubmit = e => {
    e.preventDefault();
    document.getElementById('subBtn').disabled = true;
    var payload = this.makePayload();
    
    axios.post('http://api.housingconnect.co.ke/', payload)
      .then(res=>this.handleResult(res.data))
  }
  
  handleResult = res => {
    console.log(res);
    var errorDiv = document.getElementById('errorDiv');
    
    if(res.result === 'success'){
      errorDiv.innerText = res.message;
    } else {
      errorDiv.innerText = res.message;
      document.getElementById('subBtn').disabled = false;
    }
  }
  
  render() {
    
    this.countiesList = this.state.counties.map(item => (
      <option value={ item.name }>{ item.name }</option>
    ))
    
    return (
      <div className="wrapper">
        
        <Header />
        
        <section className="new-listing-form">
          <h1>Make a new listing</h1>
          
          <p>Fill in the form to post a new listing</p>
          
          <form onSubmit={this.handleSubmit}>
            <div className="inputDiv-2">
              <label>Title</label> 
              <input type="" placeholder="Write a short relevant title about the property." value={this.state.title} onChange={this.handleTitle} required/>
            </div>
          
            <div className="inputDiv-2">
              <label htmlFor="">Category</label>
              <select value={this.state.category} onChange={this.handleCategory} required>
                <option value="default" selected disabled>Select a category</option>
                <option value="Land">Land</option>
                <option value="Apartments">Apartments</option>
                <option value="Houses">Houses</option>
                <option value="Offices">Offices</option>
                <option value="Hotels">Hotels</option>
              </select>
            </div>
            
            <div className="inputDiv-2">
              <label htmlFor="">Location</label>
              <select id="county-input" value={this.state.county} onChange={this.handleCounty} required>
                <option value="default" selected disabled >Select a county</option>
                { this.countiesList }
              </select>
              
              <select id="town-input" value={this.state.town} onChange={this.handleTown} required>
                <option value="default" selected disabled >Select a town</option>
                <option value="Embakasi">Embakasi</option>
                <option value="Starehe">Starehe</option>
                <option value="Westlands">Westlands</option>
              </select>
            </div>
            
            <div className="inputDiv-2">
              <label htmlFor="">Payment Options</label>
              
              <div id="radio-inputs">
                <span>
                  <input type="radio" className="radioBtn" value="rent" name="payment" onChange={this.handlePaymode} required/>Rent
                </span>
                <span>
                  <input type="radio" value="sale" className="radioBtn" name="payment" onChange={this.handlePaymode} required />For sale
                </span>
              </div>
              
              
              <input type="number" min="1" id="amount" placeholder="Price in KES" value={this.state.amount} onChange={this.handleAmount} required/>
              
              <select id="pay-period" value={this.state.payPeriod} onChange={this.handlePayperiod} >
                <option value="default" disabled >Select period</option>
                <option value="daily">Per Night</option>
                <option value="monthly">Per Month</option>
                <option value="annually">Per Year</option>
              </select>
              
              
            
            </div>
            
            <h2 className="divider">Section II</h2>
            
            <div className="inputDiv-2" id="beds-div">
              <label htmlFor=""> <i className="material-icons">hotel</i> Number of bedrooms</label>
              <input type="number" min="1" value={this.state.beds} onChange={this.handleBeds}/>
            </div>
            
            <div className="inputDiv-2" id="baths-div">
              <label htmlFor=""> <i className="material-icons">hot_tub</i> Number of bathrooms</label>
              <input type="number" min="1" value={this.state.baths} onChange={this.handleBaths}/>
            </div>
            
            <div className="inputDiv-2" id="parks-div">
              <label htmlFor=""> <i className="material-icons">time_to_leave</i> Number of parking spots</label>
              <input type="number" min="0" value={this.state.parking} onChange={this.handleParking} />
            </div>
            
            
            <div className="inputDiv-2" id="amenities-div">
              <label htmlFor="">Amenities  <span>(check if available)</span></label>
              
              <div id="radio-inputs">
              {/*
                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="all" onChange={this.handleAmenities}/> All
                </span>
              */}
                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="DStv" onChange={this.handleAmenities} /> DStv
                </span>

                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="Internet" onChange={this.handleAmenities}/> Internet
                </span>

                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="Pool" onChange={this.handleAmenities}/> Pool
                </span>

                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="Backup generator" onChange={this.handleAmenities}/> Backup Generator
                </span>

                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="Security cameras" onChange={this.handleAmenities}/> Security Cameras
                </span>
                
                <span>
                  <input type="checkbox" className="radioBtn" name="amenities" value="Gym" onChange={this.handleAmenities}/> Gym
                </span>
              </div>

            </div>
            
            
            <div className="inputDiv-2" id="land-div" style={{ 'display' : 'none'}}>
              <label htmlFor="">Land Size</label>
              
              <input type="number" min="1" id="land-size" placeholder="Size" value={this.state.size} onChange={this.handleSize}/>
              
              <select id="land-units" value={this.state.units} onChange={this.handleUnits}>
                <option value="" disabled>Select units</option>
                <option value="Acres">Acres</option>
                <option value="Hectares">Hectares</option>
              </select>
              
            </div>
            <div className="inputDiv-2">
              <label htmlFor="">Description</label>
              <textarea name="" id="" rows="5" placeholder="Short description of the property" value={this.state.description} onChange={this.handleDesc} required></textarea>
            </div>
            
            <p id="errorDiv"></p>
            
            <button type="submit" id="subBtn" className="btn">Create</button>
          </form>
        </section>

        

      </div>
    );
  }
}

export default New;
