import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { initializeStore } from './initializeStore';

const store = initializeStore();

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'scroll'
    },
    color: {
        color: '#f5deb3'
    }
});

const app: React.FC = () =>
    <Provider store={store}>
        <View style={styles.container}>
            <Text>this is a big thing of text</Text>
        </View>
    </Provider>;
export { app as App };