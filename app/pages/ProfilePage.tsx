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

export type ProfilePageProps = StateProps & DispatchProps;

interface StateProps {
    elections: Election[];
}

interface DispatchProps {
    requestElections: () => ActionTypes;
}

class ProfilePage extends React.PureComponent<ProfilePageProps> {
    public static navigationOptions: NavigationStackOptions = {
        title: 'Profile',
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

const profilePage = connect(mapStateToProps, mapDispatchToProps) (ProfilePage);
export { profilePage as ProfilePage };
