import React, { Component } from 'react';
import axios from 'axios';
import { Croppie } from 'croppie';

class UpdateProfile extends Component{
  
  state = {
    profileImg : ""
  }
  
  componentWillReceiveProps(nextProps){
    
    this.vanilla.bind({
      url: nextProps.image
    })
  }
  
  componentDidMount(){
    var el = document.getElementById('cropper');
    var vanilla;
    
    this.vanilla = new Croppie(el, {
      viewport: { width: 250, height: 250, type: 'circle' },
      boundary: { width: 450, height: 300 },
      showZoomer: true,
      enableOrientation: false,
      circle: true
    });
    
    this.vanilla.bind({
      url: this.state.profileImg
    });
    //on button click
    this.vanilla.result('blob').then(function(blob) {
      // do something with cropped blob
    });
  }
  
  hidePopup = () => {
    //this.cancelUpload();
    document.getElementById('avatar-popup-wrap').style.display = 'none';
  }
  
  
    
  render(){ 
    return(
      <div id="avatar-popup-wrap" className="popup-wrap">
        <div id="popup-shadow"></div>
        <div className="popup-container big-popup">
          <span id="close" onClick={this.hidePopup}>
            <i className="material-icons">close</i>
          </span>
          <h1>Update Avatar</h1>
          
          <div id="cropper"> 
            
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateProfile;

