import React, { Component } from 'react';
import axios from 'axios';


class SaveButton extends Component{
  
  state = {
    saved : ''
  }
  
  componentWillMount(){
    this.checkSaved();
  }
  
  checkSaved = () => {
    var user = this.props.user('HOUSING_CONNECT_USER');
    var id = this.props.id;
    
    var payload = {
      operation : 'checkSaved',
      listing : {
        listing_id : id,
        user_id : user
      }
    }
    
    payload = JSON.stringify(payload);
    
    axios.post('http://api.housingconnect.co.ke/', payload)
    //axios.post('http://localhost/housing/', payload)
      .then(res=>this.handleResult(res.data))
  } 
  
  handleResult = res =>{
    if(res === 1){
      this.setState({
        saved : true
      });
    } else {
      this.setState({
        saved : false
      });
    }
  }
  
  saveListing = () => {
    var id = this.props.id;
    var me = this.props.user('HOUSING_CONNECT_USER');
    
    if(me === ''){
      window.location.href = '/login';
    } else {
      var payload = {
        operation : "save_listing",
        listing : {
          listing_id : id,
          user_id : me
        } 
      };
      
      payload = JSON.stringify(payload);
    
      axios.post('http://api.housingconnect.co.ke/', payload)
      //axios.post('http://localhost/housing/', payload)
        .then(res=>this.handleSaveResult(res.data))
    }
  }
  
  handleSaveResult(res){
    if(res.result === 'success'){
      if(this.state.saved === true){
        this.setState({
          saved: false
        })
      } else {
        this.setState({
          saved: true
        })
      }
    }
  }
  
  render(){
    if(this.state.saved === true){
      this.button = <button className="btn" id="saveBtn" onClick={this.saveListing}><i className="material-icons">check</i> Saved </button>;
    } else {
      this.button = <button className="btn2" id="saveBtn" onClick={this.saveListing}><i className="material-icons">bookmark</i> Save </button>;
    }
    return(
      <span>{this.button}</span> 
    )
  }
}

export default SaveButton;