import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { Button } from 'react-native-elements';
import { LinkProps } from './Link';

export function Link ({ children, route, params }: LinkProps) {
    const navigation = useNavigation();
    return (
        <Button title={children} type="clear"
            onPress={() => navigation && navigation.navigate(route, params)} />
    );
}