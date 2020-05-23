import React from "react";
import {Button as NativeButton} from "react-native-paper";
import {ButtonProps} from "./Button";
import {StyleSheet} from "react-native";
import {PRIMARY_COLOR, SECONDARY_COLOR} from "~/theme";

const style = StyleSheet.create({
    button: {
        margin: 3,
    },
});

export function Button ({children, onPress, type, color}: ButtonProps) {
    const c = color === "primary" ? PRIMARY_COLOR :
        color === "secondary" ? SECONDARY_COLOR :
            undefined;
    return (
        <NativeButton
            mode={type ?? "text"}
            style={[{backgroundColor: c}, style.button]}
            onPress={onPress}>
            {children}
        </NativeButton>
    );
}
