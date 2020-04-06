import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Arimo:ital,wght@0,400;0,700;1,400;1,700', 'sans-serif']
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
