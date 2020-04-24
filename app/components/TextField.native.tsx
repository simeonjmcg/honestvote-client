import React from "react";
import { TextInput } from "react-native-paper";
import { TextFieldProps } from "./TextField";

export function TextField ({ label, onValueChange, value }: TextFieldProps) {
    return (
        <TextInput label={label} onChangeText={onValueChange} value={value} />
    );
}
