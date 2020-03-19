import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import kMeansApp from './store/reducers/reducer';
import { advanceState } from './store/actions/actions';

const store = createStore(
    kMeansApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
// Testing code
const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch( advanceState() );
unsubscribe();



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
