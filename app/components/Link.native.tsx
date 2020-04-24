import React from "react";
import { useNavigation } from "react-navigation-hooks";
import { Text, StyleSheet } from "react-native";
import { LinkProps } from "./Link";

const style = StyleSheet.create({
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
});

export function Link ({ children, route, params }: LinkProps) {
    const navigation = useNavigation();
    return (
        <Text style={style.link} onPress={() => navigation && navigation.navigate(route, params)}>
            {children}
        </Text>
    );
}