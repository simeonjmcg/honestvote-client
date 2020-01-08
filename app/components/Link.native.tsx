import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { Text } from 'react-native';
import { LinkProps } from './Link';

export function Link ({ children, route, params }: LinkProps) {
    const navigation = useNavigation();
    return (
        <Text onPress={() => navigation && navigation.navigate(route, params)}>
            {children}
        </Text>
    );
}