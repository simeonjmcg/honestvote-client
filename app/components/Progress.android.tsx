import React from "react";
import {ProgressProps} from "./Progress";
import {ProgressBarAndroid, StyleSheet} from "react-native";
import {SECONDARY_COLOR} from "../theme";

const style = StyleSheet.create({
    progress: {
        margin: 5,
    },
});

export function Progress ({width, progress}: ProgressProps) {
    return (
        <ProgressBarAndroid
            style={[{width}, style.progress]}
            progress={ progress }
            styleAttr="Horizontal"
            indeterminate={false}
            color={SECONDARY_COLOR} />
    );
}