import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render((
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/list/:name" component={App} />
            </div>
        </Router>
    ),
    document.getElementById('root'));
