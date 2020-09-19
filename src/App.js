import React, {Component} from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Play from './components/Play';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        		<Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} exact />
              <Route path="/play" component={Play} exact />
              <Route component={Error} />
            </Switch>
        </div>
      

      </BrowserRouter>

      
    )
  }
}


export default App;

