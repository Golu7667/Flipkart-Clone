import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left', 
        }}
      >
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </Provider>
 ,
  document.getElementById('root')
);