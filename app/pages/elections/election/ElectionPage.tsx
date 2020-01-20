import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Dispatch } from 'redux';

import {
    ActionTypes,
    requestElection, setTitle,
    getElection, areElectionsLoaded, requestVotes,
} from '~/datatypes';
import { Text, Page } from '~/components';
import { getParamFromProps } from '~/utils';
import { PRIMARY_COLOR } from '~/theme';

import { ElectionView } from './ElectionView';

// NavigationStack for native, Router for web
export type ElectionPageProps = NavigationStackScreenProps & RouteChildrenProps;

function ElectionPage ({match, navigation}: ElectionPageProps) {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const id = getParamFromProps(match, navigation, "id");
    // this is the onMount function
    useEffect(() => {
        dispatch(setTitle('Election'));

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
                <ElectionView election={election} /> :
                <Text>Election not found!</Text>
            }
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