import React, {useEffect} from "react";
import {NavigationStackScreenProps} from "react-navigation-stack";
import {RouteChildrenProps} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {
    ActionTypes,
    requestElections, getElections, openedStateString,
} from "~/datatypes";
import {Page, ListItemLink, Card, Header5, Text} from "~/components";
import {PRIMARY_COLOR} from "~/theme";

// NavigationStack for native, Router for web
export type ElectionsPageProps = NavigationStackScreenProps & RouteChildrenProps;


export function ElectionsPage () {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    useEffect(() => {
        dispatch(requestElections());
    }, []);
    const elections = useSelector(getElections);
    return (
        <Page>  
            <Card title={<Header5>Current Elections</Header5>}>
                {elections.map((row, index) => {
                    return <ListItemLink
                        key={index}
                        to={`/election/${row.id}`}
                        route="Election" params={{id: row.id}}
                        title={row.institutionName}
                        description={row.electionName}
                        right={<Text>{openedStateString(row)}</Text>}/>;
                })}
            </Card>
        </Page>
    );
}
ElectionsPage.navigationOptions = {
    title: "Elections",
    headerStyle: {
        backgroundColor: PRIMARY_COLOR,
    },
};