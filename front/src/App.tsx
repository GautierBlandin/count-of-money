import React, { Component } from 'react';

import Home from './components/Home';
import Market from './components/Market';
import ChartsPanel from './components/ChartsPanel';
import Watchlist from './components/Watchlist';
import Login from './components/Login';
import Register from './components/Register';

import Navigation from './shared/Navigation';

import { Routes ,Route } from 'react-router-dom';

const App: React.FC = props => {
  return (        
    <>
      <div className="App">
        <Navigation />
      </div>
      <Routes>                
        <Route path='/Home' element={<Home/>} />
        <Route path='/Market' element={<Market/>} /> 
        <Route path='/ChartsPanel' element={<ChartsPanel/>} />
        <Route path='/Watchlist' element={<Watchlist/>} />
        <Route path='/' element={<Home/>} />    
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />

        <Route path='/Navigation' element={<Navigation/>} />

      </Routes>
    </>
  );
}

export default App;