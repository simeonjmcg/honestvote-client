import React from 'react';
import { Button } from 'react-native';
import { LinkProps } from './Link';

export const Link = ({ children, onPress }: LinkProps) =>
    <Button title={children} onPress={onPress} />
