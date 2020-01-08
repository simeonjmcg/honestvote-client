import React from 'react';
import { Button } from './Button';
import { useNavigation } from 'react-navigation-hooks';
import { ButtonLinkProps } from './ButtonLink';

export function ButtonLink ({ children, route, params, type, onPress }: ButtonLinkProps) {
    const navigation = useNavigation();
    return (
        <Button type={type}
            onPress={() =>
                        navigation && navigation.navigate(route, params) &&
                        onPress && onPress() }>
            {children}
        </Button>
    );
}