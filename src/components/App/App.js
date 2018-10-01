import React from 'react';
import { hot } from 'react-hot-loader';
import LoginPage from 'components/Login/Login';


const App = () => (
  <div style={{ margin: 20 }} >
    <LoginPage />
  </div>
);
export default hot(module)(App);
