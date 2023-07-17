import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./Store/store";
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.scss';
import { AppProvider } from './Contexts/AppContex';
import './firebase';
import 'components/media.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AppProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppProvider>
  </BrowserRouter>
);

