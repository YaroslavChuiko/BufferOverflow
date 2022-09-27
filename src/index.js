import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeistProvider>
        <CssBaseline />
        <App />
      </GeistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
