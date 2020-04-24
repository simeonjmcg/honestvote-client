import React from "react";
import { CardProps } from "./Card";
import { StyleSheet, View } from "react-native";

const style = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        margin: 5,
        borderRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
    cardHeader: {
        marginBottom: 16,
    },
    cardContent: {

    },
});

export function Card ({ title, children, minWidth, width }: CardProps) {
    return (
        <View style={[{ minWidth, width }, style.card] }>
            <View style={ style.cardHeader }>{ title }</View>
            <View style={ style.cardContent }>{ children }</View>
        </View>
    );
}