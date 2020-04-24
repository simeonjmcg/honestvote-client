import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteChildrenProps } from "react-router";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Dispatch } from "redux";

import { Text, Page } from "~/components";
import { getParamFromProps } from "~/utils";
import { PRIMARY_COLOR } from "~/theme";
import {
    ActionTypes,
    setTitle,
    requestElection,
    getElection, areElectionsLoaded, requestVotes,
} from "~/datatypes";

import { BallotView } from "./BallotView";

// NavigationStack for native, Router for web
export type BallotPageProps = NavigationStackScreenProps & RouteChildrenProps;

function BallotPage ({ match, navigation }: BallotPageProps) {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const id = getParamFromProps(match, navigation, "id");
    // this is the onMount function
    useEffect(() => {
        dispatch(setTitle("Ballot"));

        // retrieve data
        if (id !== undefined) {
            dispatch(requestElection(id));
            dispatch(requestVotes(id));
        }
    }, []);
    const isLoaded = useSelector(areElectionsLoaded);
    const election = id !== undefined ? useSelector(getElection(id))
        : undefined;
    return (
        <Page>
            { !isLoaded ?
                <Text>Loading...</Text> : 
                election && "positions" in election ?
                    <BallotView election={election} /> :
                    <Text>Ballot not found!</Text>}
        </Page>
    );
}
BallotPage.navigationOptions = {
    title: "Ballot",
    headerStyle: {
        backgroundColor: PRIMARY_COLOR,
    },
};
export { BallotPage };