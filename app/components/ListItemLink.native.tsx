import React from 'react';
import { ListItem as ListItemNative } from 'react-native-elements';
import { ListItemLinkProps } from './ListItemLink'
import { useNavigation } from 'react-navigation-hooks';

export const ListItemLink = ({ children, route, params }: ListItemLinkProps) => {
    const navigation = useNavigation();
    return (
        <ListItemNative title={children} 
                onPress={() => navigation && navigation.navigate(route, params)}/>
    );
}
    