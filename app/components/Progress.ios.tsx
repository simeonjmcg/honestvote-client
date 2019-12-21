import React from 'react';
import { ProgressProps } from './Progress';
import { ProgressViewIOS, StyleSheet } from 'react-native';
import { SECONDARY_COLOR } from '../theme';

const style = StyleSheet.create({
    progress: {
        margin: 5,
    },
});

export function Progress ({ width, progress }: ProgressProps) {
    return (
        <ProgressViewIOS style={[{ width }, style.progress]} progress={progress} progressTintColor={SECONDARY_COLOR} />
    );
}