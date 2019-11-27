import React from 'react';
import { Provider } from 'react-redux'
import { initializeStore } from './initializeStore';

const store = initializeStore();

export const app: React.FC = () => 
    <Provider store={store}>
        hello
    </Provider>;
export { app as App };