import React, { Component } from 'react';


class ContactsPopup extends Component{
  
  state = {
    owner : {}
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      owner : {...nextProps.owner}
    })
  }
  
  hidePopup = () => {
    document.getElementById('contacts-popup-wrap').style.display = 'none';
  }
  
  render(){
    if(!this.state.owner.phone){
      this.phone = (<b>N/A</b>);
    } else {
      this.phone = (this.state.owner.phone)
    }
    
    return(
      <div id="contacts-popup-wrap" className="popup-wrap">
        <div id="popup-shadow"></div>
        <div className="popup-container small-popup">
          <span id="close" onClick={this.hidePopup}>
            <i className="material-icons">close</i>
          </span>
          
          <div id="profile-avatar">
            <div id="my-avatar">
              <img src="" alt=""/>
            </div>
            
            <h1>{ this.state.owner.first_name} {this.state.owner.last_name}</h1>
            
            {/*<Link to="/me">View profile</Link>*/}
            
            <div id="contacts">
              <span><i className="material-icons">email</i> { this.state.owner.email }</span>
              <span><i className="material-icons">phone</i> { this.phone }</span>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ContactsPopup;