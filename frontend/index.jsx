import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './components/app';
import configureStore from './store/store';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App store={store}/>
    </HashRouter>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (window.currentUser.id) {
    const preloadedState = {
      session: { currentUser: window.currentUser },
      // entities: {
        // users: { [window.currentUser.id]: window.currentUser }
      // }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // ************* testing ************
  window.store = store
  // ************* testing ************ 
  
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

});
