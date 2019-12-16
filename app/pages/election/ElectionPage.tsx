import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { getParamFromProps, ScreenFC } from '../../utils';
import {
    State,
    Election,
    requestElection,
    getElection,
    setTitle,
    ActionTypes,
} from '../../datatypes';
import { Text, Page } from '../../components';
import { Dispatch } from 'redux';
import { ElectionView } from './ElectionView';

// NavigationStack for native, Router for web
export type ElectionPageProps = NavigationStackScreenProps & RouteChildrenProps;

export const ElectionPage: ScreenFC<ElectionPageProps> = ({match, navigation}: ElectionPageProps) => {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const getId = () => getParamFromProps(match, navigation, "id");
    useEffect(() => {
        dispatch(setTitle('Election'));
        dispatch(requestElection(getId()));
    }, []);
    const election = useSelector<State, Election | undefined>(state => getElection(state, getId()));
    return (
        <Page>
            { election ?
                <ElectionView election={election} /> 
                : <Text>Election not found!</Text>}
        </Page>
    );
}
ElectionPage.navigationOptions = {
    title: "Election",
    headerStyle: {
      backgroundColor: '#f08c38',
    },
}