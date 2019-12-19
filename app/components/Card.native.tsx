import React from 'react';
import {Card as NativeCard } from 'react-native-elements';
import { CardProps } from './Card';

export const Card = ({ title, children }: CardProps) => {
    return (
        <NativeCard title={title}>
            { children }
        </NativeCard>
    );
}