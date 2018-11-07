import React, { Component } from 'react';

class Profile extends Components{
  render(){
    return(
      <section className="half-width">
        
        <h2>Edit Profile</h2>
        
        <form>
          
          <div className="inputDiv-2">
            
              <span>
                <label for="">Firstname</label>
                <input type="text" placeholder="First name"/>
              </span>
              
              <span>
                <label for="">Lastname</label>
                <input type="text" placeholder="Last name"/>
              </span>
              
          </div>
          
          
          <div className="inputDiv-2">
            <label for="">Email address</label>
            <input type="email" placeholder="Your Email address"/>
          </div>
          
          <div className="inputDiv-2">
            <label for="">Gender</label>
            <div id="radio-inputs">
              <span>
                <input type="radio" name="gender" className="radioBtn"/> Male
              </span>
              <span>
                <input type="radio" name="gender" className="radioBtn"/> Female
              </span>
              <span>
                <input type="radio" name="gender" className="radioBtn"/> Other
              </span>
            </div>
            
          </div>
          
          <div className="inputDiv-2">
            <label for="">Phone Number</label>
            <input type="text" placeholder="Your phone number"/>
          </div>
          
          <button className="btn">Save</button>
        </form>
      </section>
      
      <section className="half-width">
        
        <h2>Change password</h2>
        
        <form action="">
          <div class="inputDiv-2">
            <label for="">Old Password</label>
            <input type="password" placeholder="old password"/>
          </div>
          
          <div class="inputDiv-2">
            <label for="">New Password</label>
            <input type="password" placeholder="new password"/>
          </div>
          
          <div class="inputDiv-2">
            <label for="">Confirm new password</label>
            <input type="password" placeholder="confirm new password"/>
          </div>
          
          <button class="btn">Save</button>
        </form>
      </section>
    )
  }
}
export default Profile;