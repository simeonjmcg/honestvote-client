import React from 'react';
import { Input } from 'react-native-elements';
import { TextFieldProps } from './TextField';

export function TextField ({ label, onValueChange, value }: TextFieldProps) {
    return (
        <Input label={label} onChangeText={onValueChange} value={value} />
    );
}
