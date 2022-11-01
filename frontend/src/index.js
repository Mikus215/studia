import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextUserLogin from './Context/ContextUserLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextUserLogin>
    <App />
  </ContextUserLogin>
);

reportWebVitals();
