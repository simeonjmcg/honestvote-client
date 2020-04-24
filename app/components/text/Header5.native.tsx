import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import { Header5Props } from "./Header5";

const style = StyleSheet.create({
    header5: {
        fontSize: 24,
    },
});

export function Header5 (props: Header5Props) {
    return <NativeText style={style.header5}>{ props.children }</NativeText>;
}