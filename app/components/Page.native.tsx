import React from 'react';
import { View } from 'react-native';
import { PageProps } from './Page';

export const Page = ({ children }: PageProps) =>
    <View>{ children }</View>;