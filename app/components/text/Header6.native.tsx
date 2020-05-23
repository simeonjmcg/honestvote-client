import React from "react";
import {Text, StyleSheet} from "react-native";
import {Header6Props} from "./Header6";

const style = StyleSheet.create({
    header6: {
        fontSize: 20,
    },
});

export function Header6 ({children}: Header6Props) {
    return <Text style={style.header6}>{ children }</Text>;
}