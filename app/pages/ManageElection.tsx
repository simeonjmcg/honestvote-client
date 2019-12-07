import React from 'react';
import { Page } from '../components/Page';
import { Election, AppState, ActionTypes } from '../types';
import { List } from '../components/List';
import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { requestElections } from '../actions';
import { getElections } from '../accessors';
import { Dispatch } from 'redux';
import { NavigationStackOptions } from 'react-navigation-stack';

export type ManageElectionPageProps = StateProps & DispatchProps;

interface StateProps {
    elections: Election[];
}

interface DispatchProps {
    requestElections: () => ActionTypes;
}

class ManageElectionPage extends React.PureComponent<ManageElectionPageProps> {
    public static navigationOptions: NavigationStackOptions = {
        title: 'Manage Election',
    };
    public componentDidMount() {
        this.props.requestElections();
    }
    public render(): React.ReactElement {
        const { elections } = this.props;
        return (
            <Page>
                <List data={elections} renderRow={(row, index) => <ListItem key={index}>{row.name}</ListItem>} />
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        elections: getElections(state),
    };
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): DispatchProps => {
    return {
        requestElections: () => dispatch(requestElections()),
    };
}

const manageElectionPage = connect(mapStateToProps, mapDispatchToProps) (ManageElectionPage);
export { manageElectionPage as ManageElectionPage };
