import React from 'react';
import { RadioButton } from 'react-native-paper';
import { SECONDARY_COLOR } from '~/theme';
import { RadioProps } from './Radio';

export function Radio ({value, checked, onPress}: RadioProps) {
    return <RadioButton value={value} status={checked ? "checked" : "unchecked"} color={SECONDARY_COLOR} onPress={onPress} />
}