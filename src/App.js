import React, { Component } from 'react';
import AddInfo from './AddInfo.jsx';
import Randomizer from './Randomizer.jsx';
import './css/App.css';
import {
     Router,
    Route,
    Link
} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
// import { browserHistory } from 'react-router';



class App extends Component {
  render() {

    return (
      <div className="App">
      <BrowserRouter>
        <div>
        <Route exact path='/' component={Randomizer} />
         <Route exact path='/addInfo' component={AddInfo} />
         <Route exact path='/randomlist' component={Randomizer} />

        </div>
    </BrowserRouter>

      </div>
    );
  }
}

export default App;
