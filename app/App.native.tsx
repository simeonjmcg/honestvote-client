import React from "react";
import { Provider, useSelector } from "react-redux";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { store, isPromptingPass } from "~/datatypes";
import { ElectionsPage } from "./pages/elections/ElectionsPage";
import { ElectionPage } from "./pages/elections/election/ElectionPage";
import { BallotPage } from "./pages/elections/election/ballot/BallotPage";
import { View, Modal, StyleSheet } from "react-native";
import { PromptPassModal } from "./pages/PromptPassModal";
import { useCommon } from "./pages/common-hooks";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { RegistrationPage } from "./pages/elections/election/registration/RegistrationPage";

const MainNavigator = createStackNavigator({
    Elections: { screen: ElectionsPage },
    Election: { screen: ElectionPage },
    Ballot: { screen: BallotPage },
    Registration: { screen: RegistrationPage },
});

const Navigation = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        paddingTop: 200,
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});

function PromptPass() {
    useCommon();
    const showPrompt = useSelector(isPromptingPass);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showPrompt}>
            <View style={styles.modal} >
                <PromptPassModal />
            </View>
        </Modal>
    );
}

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#3498db",
        accent: "#f1c40f",
    },
};

export function App() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <PromptPass />
                <Navigation />
            </PaperProvider>
        </Provider>
    );
}