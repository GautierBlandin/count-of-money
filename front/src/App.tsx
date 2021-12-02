import React, { Component } from 'react';

import Account from './components/Account';
import Home from './components/Home';
import Market from './components/Market';
import Settings from './components/Settings';
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
        <Route path='/Account' element={<Account/>} /> 
        <Route path='/Home' element={<Home/>} />
        <Route path='/Market' element={<Market/>} /> 
        <Route path='/Settings' element={<Settings/>} />
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