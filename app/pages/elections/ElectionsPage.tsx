import React, { useEffect } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RouteChildrenProps } from "react-router";
import { ScreenFC } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
    State, ActionTypes,
    requestElections, getElections,
    Election,
} from "../../datatypes";
import { Page, List, ListItemLink, Text, Card, Header5 } from '../../components';

// NavigationStack for native, Router for web
export type ElectionsPageProps = NavigationStackScreenProps & RouteChildrenProps;

export const ElectionsPage: ScreenFC<ElectionsPageProps> = () => {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    useEffect(() => {
        dispatch(requestElections());
    }, []);
    const elections = useSelector<State, Election[]>(state => getElections(state));
    return (
        <Page>
            <Card title={<Header5>Current Elections</Header5>}>
                <List
                    data={elections}
                    keyExtractor={(item) => item.id}
                    renderRow={(row, index) => 
                    <ListItemLink
                        key={index}
                        to={`/election/${row.id}`}
                        route="Election"
                        params={{id: row.id}}>
                        <Text>{row.displayName}</Text>
                    </ListItemLink>} />
            </Card>
        </Page>
    );
}
ElectionsPage.navigationOptions = {
    title: "Elections",
    headerStyle: {
      backgroundColor: '#f08c38',
    },
}