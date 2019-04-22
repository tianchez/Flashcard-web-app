import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './service/FireBaseConfig'
import './index.css';

// main app
import App from './component/app'

const store = createStore(rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reactReduxFirebase(fbConfig), // redux binding for firebase
      reduxFirestore(fbConfig) // redux bindings for firestore
    )
  );

  ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
