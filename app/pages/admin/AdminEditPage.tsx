import React, {useEffect, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteChildrenProps} from 'react-router';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Dispatch} from 'redux';
import {adminCreate} from './reducer';
import {Page, ButtonLink, Text} from '~/components';
import {getParamFromProps} from '~/utils';
import {PRIMARY_COLOR} from '~/theme';
import {ActionTypes, setTitle, requestElection, requestVotes, getElection, areElectionsLoaded} from '~/datatypes';
import {AdminEditView} from './AdminEditView';


// NavigationStack for native, Router for web
export type AdminEditPageProps = NavigationStackScreenProps & RouteChildrenProps;
 
function AdminEditPage ({match, navigation}: AdminEditPageProps) {
    const dispatchP = useDispatch<Dispatch<ActionTypes>>();
    const id = getParamFromProps(match, navigation, "id");    
    const [positions, dispatch] = useReducer(adminCreate, [{id: "", displayName: "", candidates: [{key: "", name: ""}]}]);

    useEffect(() => {
        dispatchP(setTitle('Admin Edit Page'));
        // retrieve data
        if (id !== undefined) {
            dispatchP(requestElection(id));
            dispatchP(requestVotes(id));
        }
    }, []);
    
    const isLoaded = useSelector(areElectionsLoaded);    
    const election = id !== undefined ? useSelector(getElection(id))
        : undefined;
   return (
       <Page>
            <ButtonLink
                to={`/admin/dashboard`}
                route="AdminDashboardPage">
                Back to Admin Dashboard
            </ButtonLink>            
            {positions.map((row, positionIndex) =>
                !isLoaded ?
                <Text>Loading...</Text> : 
                election && "positions" in election ?
                <AdminEditView 
                    position = {row} 
                    onChange = { positionName => dispatch({type: 'set-position', payload: {positionIndex, value: positionName}})}
                    onCandidateDelete = {(candidateName, candidateIndex) => dispatch({type: 'delete-candidate', payload: {positionIndex, candidateIndex, value: candidateName}})}
                    onCandidateChange = {(candidateName, candidateIndex) => dispatch({type: 'set-candidate', payload: {positionIndex, candidateIndex, value: candidateName}})} /> :
                    <Text>Election not found!</Text>,
        )}               
       </Page>
   );
}
AdminEditPage.navigationOptions = {
    title: "Admin Edit Page",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}
export {AdminEditPage};