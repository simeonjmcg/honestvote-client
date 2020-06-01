import React, {useCallback, ChangeEvent, FocusEvent} from "react";
import {TextField as MaterialTextField} from "@material-ui/core";

export interface TextFieldProps {
    label?: string;
    onValueChange?: (str: string) => void;
    onInputBlur?: (str: string) => void;
    value?: string;
    initialValue?: string;
}

export function TextField ({label, onValueChange, onInputBlur, value, initialValue}: TextFieldProps) {
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (onValueChange) onValueChange(e.target.value);
    }, [onValueChange]);
    const onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        if (onInputBlur) onInputBlur(e.target.value);
    }, [onValueChange]);
    return (
        <MaterialTextField label={label} onChange={onChange} onBlur={onBlur} value={value} defaultValue={initialValue} />
    );
}
