import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
//import './App.css';

import Home from './component/Home';
import Navbar from './component/Navbar';
/* cognito */
import signUp from './component/auth/sign_up';
import verification from './component/auth/verification';
import sign_in from './component/auth/sign_in';
import sign_out from './component/auth/sign_out';
 
//
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home} />
          {/* auth */}
          <Route path='/auth/sign_up' component={signUp} />
          <Route path='/auth/verification' component={verification} />
          <Route path='/auth/sign_in' component={sign_in} />
          <Route path='/auth/sign_out' component={sign_out} />

        </div>
      </Router>
    </div>
  );
}
export default App;
