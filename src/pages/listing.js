import React, { Component } from 'react';
import Header from '../components/header';
//import Similar from '../components/similar';
import UploadPhotos from '../components/uploadphotos';
import ContactsPopup from '../components/contactsPopup';
import SaveButton from '../components/saveButton';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class Listing extends Component {
  state = {
    listing : {},
    editor: false,
    amenities : [],
    images : [],
    carousel : false,
    dp: {}
  }
  
  componentDidMount(){
    var id = this.props.match.params.id;
    this.getListing(id);
    this.getImages();
    window.scrollTo(0,0);
  }
  
  getImages = () => {
    var id = this.props.match.params.id;
    //axios.get('http://localhost/housing-media/'+id)
    axios.get('http://images.housingconnect.co.ke/'+id)
      .then(res=>(
        this.setState({
          images : [...res.data],
          dp: {...res.data[0]},
          carousel : true
        })  
      ));    
  }
  
  getImages2 = () =>{
    var id = this.props.match.params.id;
    //axios.get('http://localhost/housing-media/'+id)
    axios.get('http://images.housingconnect.co.ke/'+id)
      .then(res=>(
        this.setState({
          images : [...res.data],
          dp: {...res.data[0]}
        })  
      ));
  }
  
  getListing = id => {
    //axios.get('http://localhost/housing/getListing/'+id)
    axios.get('http://api.housingconnect.co.ke/getListing/'+id)
      .then(res=>this.handleResult(res.data))
  }
  
  handleResult = res => {
    this.setState({
      listing : {...res.data},
      amenities : [...res.data['amenities']]
    });
    
    this.setEditor(res.data.owner_id);
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
  
  setEditor(res){
    var logged_user = this.getCookie('HOUSING_CONNECT_USER');
    
    if(logged_user === res){
      this.setState({
        editor : true
      });
      
    }  
  }
  
  goToEditor = () =>{
    var id = this.props.match.params.id;
    window.location.href = ('/edit/'+id);
  }
  
  showUpload = () => {
    this.getImages();
    document.getElementById('upload-popup-wrap').style.display = 'block';
  }
  
  showOwner = () => {
    document.getElementById('contacts-popup-wrap').style.display = 'block';
  }

  render() {
    
    if(this.state.editor === true){
      this.editor = (
        <div className="listing-buttons">
          <button className="btn" onClick={this.showUpload}><i className="material-icons">publish</i> Upload Images</button>
          <button className="btn" onClick={this.goToEditor}><i className="material-icons">edit</i> Edit</button>
        </div>
      );
      
    } else {
      this.editor = (
        <div className="listing-buttons">
          {/*<button className="btn"><i className="material-icons">send</i>  Send Message</button>*/}
          <SaveButton id={this.props.match.params.id} user={this.getCookie} />
        </div>
      );
      
    };
    
    if(this.state.carousel === true){
      this.images = this.state.images.map(img => (
        <div>
          {/*<img src={`http://localhost/housing-media/`+img.url} alt=""/>*/}
          <img src={`http://images.housingconnect.co.ke/`+img.url} alt=""/>
        </div>
      ));
    }
    
    if(this.state.listing.category === 'Land'){
      document.getElementById('listing-amenities').style.display = 'none';
    }
    
    this.amenities = this.state.amenities.map(item =>(
      <span>
        <i className="material-icons">chevron_right</i>
        <p>{item}</p>
      </span>
    ));
    
  
    return (
      <div className="wrapper">
        
        <Header url={this.props.location.pathname}/>
        
        <div id="photo-slider">
            <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
              { this.images }
            </Carousel>
          
          { this.editor }
          {/*
          <div className="feature-icons">
            <span><i className="material-icons rounded">hotel</i> 5</span>
            <span><i className="material-icons">hot_tub</i> 3</span>
            <span><i className="material-icons">drive_eta</i>  1</span>
            <span><i className="material-icons">wifi</i></span>
          </div>
          */}
        </div>
        
        <UploadPhotos id={this.props.match.params.id} images={this.state.images} getImages={this.getImages} getImages2={this.getImages2} />
        <ContactsPopup owner={this.state.listing.owner_details} />
        
        <div id="listing-info">
          <div id="listing-header">
          
            <div id="listing-title">
              <h1>{ this.state.listing.title }</h1>
              <div id="listing-details">
                <span><i className="material-icons">place</i>{ this.state.listing.location }</span>
                <span onClick={this.showOwner}><i className="material-icons">person</i>by { this.state.listing.owner }</span>
              </div>
            </div>
            
            <div id="listing-photo" className="mobile">
              <img src={'http://images.housingconnect.co.ke/'+this.state.dp.url} alt="" />
              { this.editor }
            </div>
            
            <div id="listing-pricing">
              <h2><span>KES  </span>{ this.state.listing.price }</h2>
              <span>{ this.state.listing.payPeriod }</span>
            </div>
          </div>
          
          <section id="listing-description">
            <h3>Description</h3>
            <p>
              { this.state.listing.description }
            </p>
          </section>
          
          
          <section id="listing-amenities">
            <h3>Amenities</h3>
            
            <div id="amenities">
            
              { this.amenities }
              
            </div>
            
            
            
          </section>
          {
            /*
          <section>
            <h3>Map</h3>
            <p>Sutler galleon jolly boat square-rigged tack handsomely sheet fire in the hole Barbary Coast weigh anchor. Hardtack flogging Jack Ketch spyglass scourge of the seven seas hulk draught nipper no prey, no pay cog.</p>
            <img src="img/map.jpg" alt=""/>
          </section>
          
          */
          
        }
          
          
        </div>
        
        
        
      </div>
    );
  }
}

export default Listing;
