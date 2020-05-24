import React, {useEffect} from 'react';
import {RouteChildrenProps} from "react-router";
import {NavigationStackScreenProps} from "react-navigation-stack";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {
    ActionTypes,
    requestElections, getElections, getAdminPublicKey,
} from "~/datatypes";
import {Page, Card, Header5, ButtonLink, ListItem, View} from '~/components';
import {PRIMARY_COLOR} from '~/theme';

// NavigationStack for native, Router for web
export type AdminPageProps = NavigationStackScreenProps & RouteChildrenProps;


export function AdminDashboardPage () {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    useEffect(() => {
        dispatch(requestElections());
    }, []);
    const adminPublicKey = useSelector(getAdminPublicKey);
    const elections = useSelector(getElections).filter(e => e.sender === adminPublicKey);

    return (
        <Page>  
            
            <Card title={<Header5>Admin Dashboard</Header5>}>
                <View direction="row">
                    <ButtonLink
                        to={`/admin/create`}
                        route="AdminCreatePage">
                        Create New Election
                    </ButtonLink>
                    {elections.map((row, index) => {
                        return <ListItem
                                key={index}
                                title={row.institutionName}
                                description={row.description} />;
                    })}
                </View>
                
            </Card>

            <Card title={<Header5>My Elections</Header5>}>
            </Card>
        </Page>
    );
}
AdminDashboardPage.navigationOptions = {
    title: "Admin Dashboard",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}