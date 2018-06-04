import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createHashHistory} from 'history';
import App from "./App";
import Home from "./pages/Home/Home";
import ObituaryCreation from "./pages/ObituaryCreation/ObituaryCreation";

const Routes = (
    <Router>
    <div>
        <App>
            <Switch>
        <Route exact={true} path="/" component={Home} /> 
        <Route path="/create" component={ObituaryCreation} />
      
            </Switch>
        </App>
    </div>
    </Router>
);

export default Routes;