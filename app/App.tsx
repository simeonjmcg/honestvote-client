import React from 'react';
import { Provider } from 'react-redux'
import { store } from './datatypes/reduxStore';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ElectionsListPage } from './pages/ElectionsListPage';

export const app: React.FC = () => 
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={ElectionsListPage} />
            </Switch>
        </Router>
    </Provider>;
export { app as App };