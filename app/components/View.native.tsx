import React from "react";
import {View as NativeView} from "react-native";
import {ViewProps} from "./View";

/** User interface View */
export function View ({children, wrap, stretch, direction, width, onResize}: ViewProps) {
    return (
        <NativeView onLayout={onResize} style={{
            flexWrap: wrap ? "wrap" : "nowrap",
            flexDirection: direction ? direction : "column",
            alignContent: stretch ? "stretch" : undefined,
            width,
        }}>{ children }</NativeView>
    );
}
