import React from 'react';
import logo from './logo.svg';
import './App.css';

import MainView from './MainView';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Binding Info</h1>
      </header>
      <div className="container-fluid">
      < MainView />
      </div>

    </div>
  );
}

export default App;
