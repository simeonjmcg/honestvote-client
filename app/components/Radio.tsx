import React from "react";
import { Radio as RadioButton } from "@material-ui/core";

export interface RadioProps {
    value: string;
    checked?: boolean;
    onPress?: () => void;
}
export function Radio ({ value, checked, onPress }: RadioProps) {
    return <RadioButton value={value} checked={checked} onClick={onPress} />;
}