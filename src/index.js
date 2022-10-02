import { CssBaseline, GeistProvider } from '@geist-ui/core';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GeistProvider>
          <CssBaseline />
          <App />
        </GeistProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
