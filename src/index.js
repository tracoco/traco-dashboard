import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";
import './index.css';
import Main from './views/main';
import * as serviceWorker from './serviceWorker';

// Redux Store
import { Provider } from 'react-redux';
import { configureStore } from './store';

const store = configureStore();
const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Route path="/" component={Main} key={1} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
