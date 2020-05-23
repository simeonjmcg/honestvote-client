import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./datatypes/reduxStore";
import { makeStyles } from "@material-ui/core/styles";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AppBar, Toolbar, Typography, ThemeProvider, responsiveFontSizes, Modal } from "@material-ui/core";
import { getTitle, isPromptingPass } from "./datatypes";
import { createMuiTheme } from "@material-ui/core/styles";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./theme";

import { ElectionsPage } from "./pages/elections/ElectionsPage";
import { ElectionPage } from "./pages/elections/election/ElectionPage";
import { BallotPage } from "./pages/elections/election/ballot/BallotPage";

import { AdminCreatePage } from './pages/admin/AdminCreatePage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEditPage } from './pages/admin/AdminEditPage';

import { RegistrationPage } from "./pages/elections/election/registration/RegistrationPage";
import { PromptPassModal } from "./pages/PromptPassModal";
import { useCommon } from "./pages/common-hooks";

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
    prompt: {
        height: "100%",
        paddingTop: 200,
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
    },
}));
function ApplicationBar() {
    const styles = useStyles();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={styles.title}>
                    {useSelector(getTitle)}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

function PromptPass() {
    useCommon();
    const styles = useStyles();
    const showPrompt = useSelector(isPromptingPass);
    return (
        <Modal
            open={showPrompt} >
            <div className={styles.prompt} tabIndex={undefined}>
                <PromptPassModal />
            </div>
        </Modal>
    );
}

export function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <ApplicationBar />
                    <PromptPass />
                    <Switch>
                        <Route exact path="/"><Redirect to="/elections" /></Route>
                        <Route path="/elections" component={ElectionsPage} />
                        <Route path="/election/:id/ballot" component={BallotPage} />
                        <Route path="/election/:id/registration" component={RegistrationPage} />
                        <Route path="/election/:id" component={ElectionPage} />
                        <Route exact path="/admin/create" component={AdminCreatePage} />
                        <Route exact path="/admin/dashboard" component={AdminDashboardPage} />
                        <Route exact path="/admin/edit/:id" component={AdminEditPage} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}