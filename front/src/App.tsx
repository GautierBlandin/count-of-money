import React, { Component } from 'react';

import Home from './components/Home';
import Market from './components/Market/Market';
import ChartsPanel from './components/ChartsPanel';
import Watchlist from './components/Watchlist';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router} from 'react-router-dom';

import Navigation from './shared/Navigation';

import { Routes ,Route } from 'react-router-dom';
import AuthProvider from "./context/providers/authContext.provider";
import OAuthCallbackComponent from "./components/OAuthCallback.component";
import MeProvider from "./context/providers/meContext.provider";

const App: React.FC = props => {
  return (
      <AuthProvider>
          <MeProvider>
              <Router>
                  <div className="App">
                    <Navigation />
                  </div>
                  <Routes>
                    <Route path='/Home' element={<Home/>} />
                    <Route path='/Market' element={<Market/>} />
                    <Route path='/ChartsPanel' element={<ChartsPanel/>} />
                    <Route path='/Watchlist' element={<Watchlist/>} />
                    <Route path='/' element={<Home/>} /><Route path="/oauth-callback" element={<OAuthCallbackComponent/>}/>
                    <Route path='/Login' element={<Login/>} />
                    <Route path='/Register' element={<Register/>} />
                    <Route path='/Navigation' element={<Navigation/>} />
                  </Routes>
              </Router>
          </MeProvider>
      </AuthProvider>
  );
}

export default App
