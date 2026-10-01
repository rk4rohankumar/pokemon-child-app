import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* The host supplies <main> when this app is embedded; standalone needs its own. */}
    <main>
      <App />
    </main>
  </React.StrictMode>
);
