import { CssBaseline, GeistProvider } from '@geist-ui/core';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/store';
import { isLoggedIn } from './store/thunks/userThunk';

const container = document.getElementById('app');
const root = createRoot(container);

store.dispatch(isLoggedIn());

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
