import React, { useCallback, ChangeEvent } from 'react';
import {TextField as MaterialTextField } from '@material-ui/core';

export interface TextFieldProps {
    label?: string;
    onValueChange?: (str: string) => void;
    value?: string;
}

export function TextField ({ label, onValueChange, value }: TextFieldProps) {
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (onValueChange) onValueChange(e.target.value);
    }, [onValueChange]);
    return (
        <MaterialTextField label={label} onChange={onChange} value={value} />
    );
}
