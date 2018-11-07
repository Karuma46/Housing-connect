import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Browse from './pages/browse';
import Listing from './pages/listing';
import Messages from './pages/messages';
import New from './pages/new';
import Me from './pages/me';
import Test from './pages/test';
import Edit from './pages/edit';
import Search from './pages/search';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Browse} />
          <Route path="/listing/:id" exact component={Listing} />
          <Route path="/inbox" exact component={Messages} />
          <Route path="/new" exact component={New} />
          <Route path="/me" exact component={Me} />
          <Route path="/test" exact component={Test} />
          <Route path="/edit/:id" exact component={Edit} />
          <Route path="/search/:q" exact component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
