import React from 'react';
import { Provider, useSelector } from 'react-redux'
import { store } from './datatypes/reduxStore';
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import { State, getTitle } from './datatypes';
import { createMuiTheme } from '@material-ui/core/styles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './theme';

import { ElectionsPage } from './pages/elections/ElectionsPage';
import { ElectionPage } from './pages/elections/election/ElectionPage';
import { BallotPage } from './pages/elections/election/ballot/BallotPage';

const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: { main: PRIMARY_COLOR },
        secondary: { main: SECONDARY_COLOR },
    },
}));

const useStyles = makeStyles(_ => ({
    title: {
        flexGrow: 1,
    },
}));
function ApplicationBar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={useStyles().title}>
                    {useSelector<State, string>(state => getTitle(state))}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <ApplicationBar />
                    <Switch>
                        <Route exact path="/"><Redirect to="/elections" /></Route>
                        <Route path="/elections" component={ElectionsPage} />
                        <Route path="/election/:id" component={ElectionPage} />
                        <Route path="/election/:id/ballot" component={BallotPage} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}