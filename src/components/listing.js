import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ListingComponent extends Component{
  
  state = {
    profileImg : {}
  }
  
  
  componentWillMount(){
    this.getThumbs();
  }
  
  
  getThumbs = () => {
    var id = this.props.details.listing_id;
    //axios.get('http://localhost/housing-media/'+id)
    axios.get('http://images.housingconnect.co.ke/'+id)
    .then(res=>(
      this.setState({
        profileImg : {...res.data[0]}
      })
    ));
  }
  
  render(){
    return(
      <div className="items listings" key={this.props.details.listingId}>
        <Link to={`/listing/`+this.props.details.listingId}>
        <div className="listing-top">
          <img src={`http://images.housingconnect.co.ke/`+this.state.profileImg.url} alt=""/>
        </div>
        </Link>
        <div className="listing-bottom">
          <Link to={`/listing/`+this.props.details.listingId}><h2 className="listingTitle">{this.props.details.title}</h2></Link>
          <h2 className="listing-price"><span>KES </span>{this.props.details.amount > 1000000 ? this.props.details.amount/1000000+'M': this.props.details.amount/1000+'K'}</h2>
          <span className="listing-location"><i className="material-icons">location_on</i> {this.props.details.location}</span>
          
          <p className="desktop">{this.props.details.description}</p>
          {/*
          <div className="item-actions">
            <span><i className="material-icons">send</i></span>
            <span><i className="material-icons" onClick={this.saveListing}>bookmark</i></span>
          </div>
          */}
        </div>
        
      </div>
    )
  }
}

export default ListingComponent;