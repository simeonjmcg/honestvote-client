import React from "react";
import {Text as NativeText} from "react-native";
import {TextProps} from "./Text";

export function Text ({children, color, onPress}: TextProps) {
    return <NativeText style={{color}} onPress={onPress}>{ children }</NativeText>;
}