import React, {useReducer, useState} from 'react';
import {NavigationStackScreenProps} from "react-navigation-stack";
import {RouteChildrenProps} from "react-router";
import {Page, TextField, Card, Header5, Button, ButtonLink, View} from '~/components';
import {adminCreate} from './reducer';
import {PRIMARY_COLOR} from '~/theme';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {ActionTypes, saveElection, getElections, getAdminPublicKey} from "~/datatypes";
import {AdminPositionsView} from './AdminPositionsView';

// NavigationStack for native, Router for web
export type AdminPageProps = NavigationStackScreenProps & RouteChildrenProps;

export function AdminCreatePage () {
    const [positions, dispatch] = useReducer(adminCreate, [{id: "", displayName: "", candidates: [{key: "", name: ""}]}]);
    const reduxDispatch = useDispatch<Dispatch<ActionTypes>>();
    const [electionName, setElectionName]  = useState(""); 
    const [description, setDescription]  = useState(""); 
    const [startDate, setStartDate]  = useState(""); 
    const [endDate, setEndDate]  = useState("");
    const [emailDomain, setEmailDomain]  = useState("");
    const adminPublicKey = useSelector(getAdminPublicKey);
    const election = useSelector(getElections).find(e => e.sender === adminPublicKey);
    const institutionName = election ? election.institutionName : "";

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
                    <TextField label="Email Domain" onValueChange = {setEmailDomain} ></TextField>
                </View>

                <AdminPositionsView
                    electionPositions={positions}
                    onPositionAdd={() => dispatch({type: 'add-position'})}
                    onPositionChange={(positionName, positionIndex) => dispatch({type: 'set-position', payload: {positionIndex, value: positionName}})}
                    onPositionDelete={positionIndex => dispatch({type: 'delete-position', payload: {positionIndex}})}
                    onCandidateAdd={positionIndex => dispatch({type: 'add-candidate', payload: {positionIndex}})}
                    onCandidateChange={(candidateName, positionIndex, candidateIndex) => dispatch({type: 'set-candidate', payload: {positionIndex, candidateIndex, value: candidateName}})}
                    onCandidateDelete={(positionIndex, candidateIndex) => dispatch({type: 'delete-candidate', payload: {positionIndex, candidateIndex}})}
                    />
                <View direction="row">
                    <Button type="contained" onPress={() => reduxDispatch(saveElection({electionName, description, startDate, endDate, positions, sender: adminPublicKey || "", emailDomain, institutionName, id:"", signature:""}))}>Create Election</Button>
                </View>
            </Card>
        </Page>
    );
}
AdminCreatePage.navigationOptions = {
    title: "Admin Create Election Page",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}