import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import {
    Page, List, ListItem, Link,
} from '../../components';
import {
    Election,
    State, ActionTypes,
    requestElections,
    getElections,
} from '../../datatypes';

export type ElectionsPageProps =
    StateProps & DispatchProps & // redux props
    NavigationStackScreenProps & RouteChildrenProps; // NavigationStack for native, Router for web

interface StateProps {
    elections: Election[];
}

interface DispatchProps {
    requestElections: () => ActionTypes;
}

class ElectionsPage extends React.PureComponent<ElectionsPageProps> {
    public static navigationOptions: NavigationStackOptions = {
        title: 'Elections',
    };
    public componentDidMount() {
        this.props.requestElections();
    }
    public render(): React.ReactElement {
        const { elections } = this.props;
        return (
            <Page>
                <List data={elections} renderRow={(row, index) => 
                    <ListItem key={index}>
                        <Link
                            to={"/election/" + row.id}
                            onPress={() => this.props.navigation &&
                                this.props.navigation.navigate("Election", {id: row.id})}>
                                {row.displayName}
                        </Link>
                    </ListItem>} />
            </Page>
        );
    }
}

const mapStateToProps = (state: State): StateProps =>
    ({ elections: getElections(state) });

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): DispatchProps =>
    ({ requestElections: () => dispatch(requestElections()) });

const electionsPage = connect(mapStateToProps, mapDispatchToProps) (ElectionsPage);
export { electionsPage as ElectionsPage };