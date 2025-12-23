import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { kyInstance } from './lib/ky';

createRoot(document.getElementById("root")!).render(<App />);


kyInstance.get('config').json().then((data) => {
  console.log('Config data from main process:', data);
}).catch((error) => {
  console.error('Failed to fetch config data:', error);
});