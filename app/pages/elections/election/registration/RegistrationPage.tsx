import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Dispatch } from 'redux';
import {
    ActionTypes,
    requestElection, setTitle,
    getElection, areElectionsLoaded, requestElectionPermissions,Election,
    getIsPermissionRequestActive, getIsUserRegistered, resetRequestElectionPermissions,
} from '~/datatypes';
import { Text, Page, TextField, Button, View, Header5, Subtitle1, Link } from '~/components';
import { getParamFromProps } from '~/utils';
import { PRIMARY_COLOR } from '~/theme';

export type RegistrationPageProps = NavigationStackScreenProps & RouteChildrenProps;
export interface ElectionViewProps {
    election: Election;
}


function RegistrationPage( {match, navigation}: RegistrationPageProps ){

    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const id = getParamFromProps(match, navigation, "id");
    const isLoaded = useSelector(areElectionsLoaded);

    const isRequested = id != undefined ? useSelector(getIsPermissionRequestActive(id)) : false;
    const [ error, setError ] = useState<string | undefined>(undefined);

    const canUserVote = id != undefined ? useSelector(getIsUserRegistered(id)) : false;

    const [email, setEmail] = useState(""); 
    //let regexEmail = new RegExp ('@wcupa.edu$');
    // this is the onMount function
    useEffect(() => {
        dispatch(setTitle('Registration'));
        // retrieve all data
        if (id !== undefined) {
            dispatch(requestElection(id));
        }
    }, []);

    const election = id !== undefined ? useSelector(getElection(id)) : undefined;
    return (
        <Page>
            {
                !isLoaded ? <Text>Loading...</Text> :
                canUserVote ? <Text>
                    You are registered for this election. Click <Link to={`/election/${id}`} route="Election" params={{ id: id || "" }}>here</Link> to return to Election page.
                </Text> :
                isRequested && election ? <View>
                    <Text>You have successfully requested registration for { election.displayName} please check your email for confirmation.</Text>
                    <View direction="row">
                    <Button type="contained" onPress={() => dispatch(resetRequestElectionPermissions(id!))}>Resend</Button>
                    </View>
                </View> :
                election  ? <>
                        <Header5>{election.displayName || "Unknown"}</Header5>
                        <Subtitle1>{election.term || "Unknown"}</Subtitle1>
                            <View>
                                <TextField label="Email" onValueChange = {setEmail} />
                            </View>   
                            <Text color="red">{ error }</Text>                          
                            <Button onPress = {() => { 
                                
                                let regexEmail = new RegExp (election.emailDomain);
                                if (regexEmail.test(email)) {
                                    dispatch(requestElectionPermissions ( election.id, email ));
                                } else {
                                    setError("Email Not Valid.");
                                }
                               
                            }}>Register</Button>
                </> :
                          <Text>Election not found!</Text>
            }
            
            
        </Page>
    );
}
RegistrationPage.navigationOptions = {
    title: "Registration",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}
export { RegistrationPage };