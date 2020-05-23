import React, { useEffect } from 'react';
import { RouteChildrenProps } from "react-router";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
    ActionTypes,
    requestElections, getElections,
} from "~/datatypes";
import { Page, Card, Header5, ButtonLink, ListItem,View } from '~/components';
import { PRIMARY_COLOR } from '~/theme';

// NavigationStack for native, Router for web
export type AdminPageProps = NavigationStackScreenProps & RouteChildrenProps;


export function AdminDashboardPage () {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    useEffect(() => {
        dispatch(requestElections());
    }, []);
    const elections = useSelector(getElections);

    return (
        <Page>  
            
            <Card title={<Header5>Admin Dashboard</Header5>}>
                {
                    <View direction="row">
                        <ButtonLink
                            to={`/admin/create`}
                            route="AdminCreatePage">
                            Create New Election
                        </ButtonLink>
                    </View>                
                }
                
            </Card>

            <Card title={<Header5>All Elections</Header5>}>
                {elections.map((row, index) => {
                    return <ListItem
                            key={index}
                            title={row.institutionName}
                            description={row.description} />;
                            {/*right={
                                <ButtonLink
                                    to={`/admin/edit/${row.id}`}
                                    route="AdminEditPage"
                                    params={{id: row.id}}>
                                    Edit
                                </ButtonLink>} */ 
                            }
                            
                })}
            </Card>
        </Page>
    );
}
AdminDashboardPage.navigationOptions = {
    title: "Admin All Elections Page",
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
}