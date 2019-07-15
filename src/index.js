import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Redux/state';


store.sort();
export let reRenderDOM = ()=>{ReactDOM.render(<App store = {store}/>, 
    document.getElementById('root'));
    serviceWorker.unregister();
}

reRenderDOM(store);
store.subscribe(reRenderDOM);
