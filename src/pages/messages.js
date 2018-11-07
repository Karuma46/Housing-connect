import React, { Component } from 'react';
import Header from '../components/header';


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div id="inbox-wrap">
          <div id="chats">
            
            <h2>Chats</h2>
            
            <div className="chat">
              <div className="chat-avatar"></div>
              <div className="chat-text">
                <h3>Jane Doe</h3>
                <p>Hi there, do you have an open house? I was hoping i could take a look and see if i like it.</p>
                <span className="chat-time">10:45</span>
              </div>
            </div>
            <div className="chat">
              <div className="chat-avatar"></div>
              <div className="chat-text">
                <h3>Jane Doe</h3>
                <p>Hi there, do you have an open house?</p>
                <span className="chat-time">10:45</span>
              </div>
            </div>
            <div className="chat">
              <div className="chat-avatar"></div>
              <div className="chat-text">
                <h3>Jane Doe</h3>
                <p>Hi there, do you have an open house? I was hoping i could take a look and see if i like it.</p>
                <span className="chat-time">10:45</span>
              </div>
            </div>
            <div className="chat">
              <div className="chat-avatar"></div>
              <div className="chat-text">
                <h3>Jane Doe</h3>
                <p>Hi there, do you have an open house? </p>
                <span className="chat-time">10:45</span>
              </div>
            </div>

          
          </div>
          <div id="thread">
            
            <div className="threads">
              <div className="sent"><span>Hi</span></div>
              <div className="recieved"><span>Hello there, can i help you?</span></div>
              <div className="sent"><span>I would like to see an open house, if that is possible.</span></div>
            </div>
            
            <div id="chat-input">
              <input type="text" placeholder="Type a message"/>
              <button><i className="material-icons">send</i></button>
            </div>
          </div>
          
          <div id="listing-context">
            <div className="items listings">
              
              <div className="listing-top">
                <img src="img/home.jpg" alt=""/>
                <div className="feature-icons">
                  <span><i className="material-icons rounded">hotel</i> 5</span>
                  <span><i className="material-icons">hot_tub</i> 3</span>
                  <span><i className="material-icons">drive_eta</i>  1</span>
                  <span><i className="material-icons">wifi</i></span>
                </div>
              </div>
              
              <div className="listing-bottom">
                <h2>5 bedroom house</h2>
                <h2 className="listing-price"><span>KES</span>300K</h2>
                <span className="listing-location"><i className="material-icons">location_on</i> Karen, Nairobi</span>
                <p>Sutler galleon jolly boat square-rigged tack handsomely sheet fire in the hole Barbary Coast weigh anchor. Hardtack flogging Jack Ketch spyglass scourge of the seven seas hulk draught nipper no prey, no pay cog</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
