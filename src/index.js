import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import {Provider, useDispatch} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {fetchData, doSomething} from './features/mapSlice'
import getCurrentDate from './features/Utils'

store.dispatch(fetchData(getCurrentDate()));

ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
