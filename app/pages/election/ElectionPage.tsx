import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { getParamFromProps } from '../../utils';
import {
    State,
    Election,
    requestElection,
    getElection,
    setTitle,
    ActionTypes,
    areElectionsLoaded,
} from '../../datatypes';
import { Text, Page } from '../../components';
import { Dispatch } from 'redux';
import { ElectionView } from './ElectionView';
import { PRIMARY_COLOR } from '../../theme';

// NavigationStack for native, Router for web
export type ElectionPageProps = NavigationStackScreenProps & RouteChildrenProps;

function ElectionPage ({match, navigation}: ElectionPageProps) {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const id = getParamFromProps(match, navigation, "id");
    // this is the onMount function
    useEffect(() => {
        dispatch(setTitle('Election'));
        if (id !== undefined) {
            dispatch(requestElection(id));
        }
    }, []);
    const isLoaded = useSelector<State, boolean>(state => areElectionsLoaded(state));
    const election = id !== undefined ?
        useSelector<State, Election|undefined>(state => getElection(state, id))
        : undefined;
    return (
        <Page>
            { !isLoaded ? <Text>Loading...</Text> : 
              election  ? <ElectionView election={election} /> :
                          <Text>Election not found!</Text>}
        </Page>
    );
}
ElectionPage.navigationOptions = {
    title: "Election",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}
export { ElectionPage };