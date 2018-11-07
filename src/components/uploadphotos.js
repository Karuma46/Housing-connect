import React , {Component} from 'react';
import axios from 'axios';

class uploadphotos extends Component {

  state = {
    img_url : '',
    img: ''
  }
    
  hidePopup = () => {
    this.cancelUpload();
    document.getElementById('upload-popup-wrap').style.display = 'none';
  }
  
  showImg = e => {
    var input = document.getElementById('img_input');
    if (input.files && input.files[0]) {
    
    this.setState({
      img : e.target.files[0]
    })
      
     var reader = new FileReader();
     
     reader.onload = e => {
      this.setState({
        img_url : e.target.result
      })
       document.getElementById('img_upload_form').style.display = 'none';
       document.getElementById('img_preview').style.display = 'block';
     }
     
     reader.readAsDataURL(input.files[0]);
   }
  }
  
  cancelUpload = () => {
    this.setState({
      img_url : '',
      img : ''
    })
    document.getElementById('img_upload_form').style.display = 'block';
    document.getElementById('img_preview').style.display = 'none';
  }
  
  startUpload = () => {
    document.getElementById('upload_event').style.display = 'none';
    document.getElementById('uploading_event').style.display = 'block';
    document.getElementById('uploading_event').innerText = 'Uploading...';
    
    var fd = new FormData();
    
    fd.append('image', this.state.img);
    fd.append('listing_id', this.props.id);
    fd.append('operation', 'upload');
    
    //axios.post('http://localhost/housing-media/',fd)
    axios.post('http://images.housingconnect.co.ke/',fd)
    .then(res=>this.handleResult(res.data));
  }
  
  handleResult(res){
    if(res === 'TRUE'){
      document.getElementById('uploading_event').innerText = 'Image Uploaded';
      console.log('Image has been uploaded');
      //reload images
      
      this.cancelUpload();
      document.getElementById('uploading_event').style.display = 'none';
      document.getElementById('upload_event').style.display = 'block';
      //document.getElementById('action_btns').insertAdjacentHTML('afterbegin', '<span onClick={this.cancelUpload}>Cancel</span><span onClick={this.startUpload}>Upload</span>');
      this.props.getImages();
      
    } else {
      document.getElementById('uploading_event').innerText = 'Image not Uploaded';
      console.log('Image not uploaded');
      this.cancelUpload();
      
      document.getElementById('uploading_event').style.display = 'none';
      document.getElementById('upload_event').style.display = 'block';
      
    }
  }
  
  deletePhoto = url => {
    var fd = new FormData();
    fd.append('operation', 'delete');
    fd.append('image', url);
    
    //axios.post('http://localhost/housing-media/',fd)
    axios.post('http://images.housingconnect.co.ke/',fd)
    .then(res=>this.handleDelete(res.data));
    
    //console.log(url);
  }
  
  handleDelete(res){
    if(res === 'TRUE'){
      this.props.getImages();
    }
  }
  
  render(){
    
    this.images = this.props.images.map(img => (
      <div className="photo-container">
        {/*<img src={`http://localhost/housing-media/`+img.url} alt=""/>*/}
        <img src={`http://images.housingconnect.co.ke/`+img.url} alt=""/>
        <div className="photo-operations">
          <i className="material-icons" onClick={(e)=>this.deletePhoto(img.url, e)}>delete_outline</i>
        </div>
      </div>
    ));
    
    return(
      <div id="upload-popup-wrap" className="popup-wrap">
        <div id="popup-shadow"></div>
        <div className="popup-container big-popup">
          <span id="close" onClick={this.hidePopup}>
            <i className="material-icons">close</i>
          </span>
          <h1>Listing Photos</h1>
          
          <div id="photos-wrap">
            { this.images }
            
            
            <div className="photo-container upload_btn">
              <div id="img_preview">
                <img src={this.state.img_url} alt="" id="upload_prev"/>
                <div id="action_btns">
                  <span id="upload_event">
                    <span onClick={this.cancelUpload}>Cancel</span>
                    <span onClick={this.startUpload}>Upload</span>
                  </span>
                  
                  <span id="uploading_event">
                    
                  </span>
                  
                  
                </div>
                
              </div>
              <form id="img_upload_form">
                <label htmlFor="img_input"><i className="material-icons">add</i></label>
                <input type="file" id="img_input" accept="image/*" onChange={this.showImg}/>
                <input type="hidden" id="listing_id" value={this.props.id}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default uploadphotos;