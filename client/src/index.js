import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Font Awesome
import 'font-awesome/css/font-awesome.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);