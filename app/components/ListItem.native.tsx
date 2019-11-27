import React from 'react';
import { Text } from 'react-native';

export interface ListItemProps {
    children?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = (props: ListItemProps): React.ReactElement =>
    <Text>
        { props.children }
    </Text>;