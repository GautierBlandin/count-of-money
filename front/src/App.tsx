import React from 'react';

import {
    Routes,
    Route,
    BrowserRouter
} from 'react-router-dom';
import Home from "./components/Home";
import OAuthCallbackComponent from "./components/OAuthCallback.component";
import LoginComponent from "./components/Login.component";
import AuthProvider from "./context/providers/authContext.provider";


const App: React.FC = props => {
  return(
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}>
                  </Route>
                  <Route path="/oauth-callback" element={<OAuthCallbackComponent/>}>

                  </Route>
                  <Route path="/login" element={<LoginComponent/>}>

                  </Route>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App
