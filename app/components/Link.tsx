import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

export interface LinkProps {
    children: string;
    to: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const Link = ({ to, children }: LinkProps) =>
    <RouterLink to={to}>{ children }</RouterLink>;
