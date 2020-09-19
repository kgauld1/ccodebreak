import React from 'react';
import { Switch, NavLink } from 'react-router-dom';

import './Play.css';

function Play(){
  return (
			<div className="App">
      <header className="App-header">

        <div className="play-main">
          
          <div className="screen"> Type your answer: </div>
          <div className="chat"> Chat

            <div className="messages"></div>

            <div className="message-bar">
              <textarea type="text" id="message"></textarea>
              <button id="send"> > </button>
            </div>
          </div>
          


        </div>

        

      </header>
    </div>
	)
}


export default Play;