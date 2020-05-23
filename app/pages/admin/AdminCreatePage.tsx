import React, {useReducer, useState} from 'react';
import {NavigationStackScreenProps} from "react-navigation-stack";
import {RouteChildrenProps} from "react-router";
import {Page, TextField, Card, Header5, Button, ButtonLink, View} from '~/components';
import {adminCreate} from './reducer';
import {PRIMARY_COLOR} from '~/theme';
import {AdminPositionView} from './AdminPositionView';
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {ActionTypes, saveElection} from "~/datatypes";

// NavigationStack for native, Router for web
export type AdminPageProps = NavigationStackScreenProps & RouteChildrenProps;

export function AdminCreatePage () {
    const [positions, dispatch] = useReducer(adminCreate, [{id: "", displayName: "", candidates: [{key: "", name: ""}]}]);
    const reduxDispatch = useDispatch<Dispatch<ActionTypes>>();
    const [electionName, setElectionName]  = useState(""); 
    const [description, setDescription]  = useState(""); 
    const [startDate, setStartDate]  = useState(""); 
    const [endDate, setEndDate]  = useState("");

    return (
        <Page>  
            <ButtonLink
                to={`/admin/dashboard`}
                route="AdminDashboardPage">
                Back to Admin Dashboard
            </ButtonLink>
            
            <Card title={<Header5>Admin Create Election Page</Header5>}>
                <View direction="column">
                    <TextField label="Election Name" onValueChange = {setElectionName} ></TextField>
                    <TextField label="Election Description" onValueChange = {setDescription} ></TextField>
                    <TextField label="Starting Date" onValueChange = {setStartDate} ></TextField>
                    <TextField label="End Date" onValueChange = {setEndDate} ></TextField>
                </View>
            </Card>

            <Card title={<Header5>Positions</Header5>}>                    
                <Button type="contained" onPress={() => dispatch({type: 'add-position'})}>Add Position</Button>
                    {positions.map((row, positionIndex) => 
                    <AdminPositionView 
                        key={positionIndex}
                        electionPosition = { row } 
                        onChange = { positionName => dispatch({type: 'set-position', payload: {positionIndex, value: positionName}})}
                        onCandidateAdd = { () => dispatch({type: 'add-candidate', payload: {positionIndex}})}
                        onCandidateDelete = {(candidateName, candidateIndex) => dispatch({type: 'delete-candidate', payload: {positionIndex, candidateIndex, value: candidateName}})}
                        onCandidateChange = {(candidateName, candidateIndex) => dispatch({type: 'set-candidate', payload: {positionIndex, candidateIndex, value: candidateName}})} />,
                )}
            </Card>
            <Button type="contained" onPress={() => reduxDispatch(saveElection({electionName, description, startDate, endDate, positions, sender:"", emailDomain:"", allowedCandidates:[], institutionName: "", id:"", signature:""}))}>Create Election</Button>
        </Page>
    );
}
AdminCreatePage.navigationOptions = {
    title: "Admin Create Election Page",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}