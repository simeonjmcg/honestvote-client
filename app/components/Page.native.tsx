import React from "react";
import {ScrollView} from "react-native";
import {PageProps} from "./Page";

export function Page ({children}: PageProps) {
    return <ScrollView>{ children }</ScrollView>;
}