import React, { useEffect } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RouteChildrenProps } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
    State, ActionTypes,
    requestElections, getElections,
    Election,
} from "../../datatypes";
import { Page, List, ListItemLink, Text, Card, Header5 } from '../../components';
import { PRIMARY_COLOR } from '../../theme';

// NavigationStack for native, Router for web
export type ElectionsPageProps = NavigationStackScreenProps & RouteChildrenProps;

export function ElectionsPage () {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    useEffect(() => {
        dispatch(requestElections());
    }, []);
    const elections = useSelector<State, Election[]>(state => getElections(state));
    return (
        <Page>
            <Card title={<Header5>Current Elections</Header5>}>
                {elections.map((row, index) => 
                    <ListItemLink
                        key={index}
                        to={`/election/${row.id}`}
                        route="Election"
                        params={{id: row.id}}>
                        <Text>{row.displayName}</Text>
                    </ListItemLink>)}
            </Card>
        </Page>
    );
}
ElectionsPage.navigationOptions = {
    title: "Elections",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}