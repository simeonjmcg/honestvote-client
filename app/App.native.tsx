import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { store } from './reduxStore';
import { ElectionPage } from './pages/ElectionPage';

const MainNavigator = createStackNavigator({
  Election: { path: 'election', screen: ElectionPage },
});

const Navigation = createAppContainer(MainNavigator);

const App: React.FC = () =>
    <Provider store={store}>
        <Navigation />
    </Provider>;
export { App };