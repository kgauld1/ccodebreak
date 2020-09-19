import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

function Home() {
	return (
		<div className="App">
      <header className="App-header">

        <div className="navbar">
          <h3> CCodebreak </h3>
        </div>
        <br></br>
        
        <div className="main">
          
          <p> Welcome to CCodebreak! Description description description description description description description description description </p>


          <form>
            <label htmlFor="username"> Enter your name: </label> <br></br>
            <input type="text" id="username" maxLength="30"></input> <br></br><br></br>

            <input type="text" id="room-code" maxLength="10" placeholder="Room code"></input>
            <NavLink to="/play" style={{ textDecoration: 'none' }}> <button id="join"> Join </button> </NavLink>
            <br></br><br></br>
            
            <NavLink to="/play" style={{ textDecoration: 'none' }}> <button id="create-match"> Create match </button> </NavLink>
            <button id="solo"> Solo match </button> <br></br><br></br>
            
            <NavLink to="/play" style={{ textDecoration: 'none' }}> <button id="join-random"> Random match </button> </NavLink>
            <NavLink to="/about" style={{ textDecoration: 'none' }}> <button id="how-to"> How to play </button> </NavLink>


          </form>
          

          <p> random lil buttons here idk</p>
        </div>
      </header>
    </div>
	)
}

export default Home;