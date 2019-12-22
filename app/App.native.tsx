import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { store } from '~/datatypes';
import { ElectionsPage } from './pages/elections/ElectionsPage';
import { ElectionPage } from './pages/elections/election/ElectionPage';
import { BallotPage } from './pages/elections/election/ballot/BallotPage';

const MainNavigator = createStackNavigator({
  Elections: { screen: ElectionsPage },
  Election: { screen: ElectionPage },
  Ballot: { screen: BallotPage },
});

const Navigation = createAppContainer(MainNavigator);

export function App () {
    return <Provider store={store}>
        <Navigation />
    </Provider>;
}