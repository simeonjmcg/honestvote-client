import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { store } from './datatypes';
import { ElectionsPage } from './pages/elections/ElectionsPage';
import { ElectionPage } from './pages/election/ElectionPage';

const MainNavigator = createStackNavigator({
  Elections: { screen: ElectionsPage },
  Election: { screen: ElectionPage },
});

const Navigation = createAppContainer(MainNavigator);

export const App: React.FC = () =>
    <Provider store={store}>
        <Navigation />
    </Provider>;