import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppProvider from './context/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </AppProvider>
  </React.StrictMode>
);