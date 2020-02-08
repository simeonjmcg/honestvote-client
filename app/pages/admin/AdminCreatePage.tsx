import React, { useEffect } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RouteChildrenProps } from "react-router";
import { Page, TextField, Card, Header5, Button, ButtonLink, View} from '~/components';
import { PRIMARY_COLOR } from '~/theme';

// NavigationStack for native, Router for web
export type AdminPageProps = NavigationStackScreenProps & RouteChildrenProps;


//RetrieveAdminKey, InstututionName, 

function AdminCreate{ state: }



export function AdminCreatePage () {
        
    return (
        <Page>  
            <ButtonLink
                to={`/admin/dashboard`}
                route="AdminDashboardPage"
                params={{

                }}>
                Back to Admin Dashboard
            </ButtonLink>
            
            <Card title={<Header5>Admin Create Election Page</Header5>}>
                <View direction="column">
                    <TextField label="Election Name"></TextField>
                    <TextField label="Election Description"></TextField>
                    <TextField label="Starting Date"></TextField>
                    <TextField label="End Date"></TextField>

                    <Header5>Positions</Header5>
                    {/*  <TextField label="Position Name"></TextField>} */}
                    <Button onPress={  }>Add Position</Button>

                    <Header5>Candidates</Header5>
                    {/* <TextField label="Candidate Name"></TextField> */}
                    
                    <Button>Add Candidate</Button>
                 
                    
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