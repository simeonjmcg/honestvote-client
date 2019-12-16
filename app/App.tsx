import React from 'react';
import { Provider, useSelector } from 'react-redux'
import { store } from './datatypes/reduxStore';
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ElectionsPage } from './pages/elections/ElectionsPage';
import { ElectionPage } from './pages/election/ElectionPage';
import { AppBar, Toolbar, Typography, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import { State, getTitle } from './datatypes';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: { main: "#f08c38" },
    secondary: { main: "#6bc4d2" },
  },
}));

const useStyles = makeStyles(_ => ({
    title: {
        flexGrow: 1,
    },
}));
const ApplicationBar = () =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={useStyles().title}>
                {useSelector<State, string>(state => getTitle(state))}
            </Typography>
        </Toolbar>
    </AppBar>;

export const App: React.FC = () =>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ApplicationBar />
            <Router>
                <Switch>
                    <Route exact path="/"><Redirect to="/elections" /></Route>
                    <Route path="/elections" component={ElectionsPage} />
                    <Route path="/election/:id" component={ElectionPage} />
                </Switch>
            </Router>
        </ThemeProvider>
    </Provider>;