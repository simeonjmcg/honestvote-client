import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { store } from './datatypes/reduxStore';
import { ElectionsListPage } from './pages/ElectionsListPage';

const MainNavigator = createStackNavigator({
  ElectionsList: { path: 'elections-list', screen: ElectionsListPage },
});

const Navigation = createAppContainer(MainNavigator);

const App: React.FC = () =>
    <Provider store={store}>
        <Navigation />
    </Provider>;
export { App };