import React from 'react';
import { View } from 'react-native';

export interface PageProps {
    children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = (props: PageProps): React.ReactElement =>
    <View>
        { props.children }
    </View>;