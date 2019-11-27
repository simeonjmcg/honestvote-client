import React from 'react';
import { Provider } from 'react-redux'
import { store } from './reduxStore';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ElectionPage } from './pages/ElectionPage';

export const app: React.FC = () => 
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={ElectionPage} />
            </Switch>
        </Router>
    </Provider>;
export { app as App };