import React from 'react';
import { Page } from '../components/Page';
import { AppState } from '../datatypes/types';
import { List } from '../components/List';
import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { getElections } from '../datatypes/accessors';
import { Dispatch } from 'redux';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Election, ElectionActionTypes } from '../datatypes/elections/types';
import { requestElections } from '../datatypes/actions';

export type ProfilePageProps = StateProps & DispatchProps;

interface StateProps {
    elections: Election[];
}

interface DispatchProps {
    requestElections: () => ElectionActionTypes;
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
                <List data={elections} renderRow={(row, index) => <ListItem key={index}>{row.displayName}</ListItem>} />
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        elections: getElections(state),
    };
}

const mapDispatchToProps = (dispatch: Dispatch<ElectionActionTypes>): DispatchProps => {
    return {
        requestElections: () => dispatch(requestElections()),
    };
}

const profilePage = connect(mapStateToProps, mapDispatchToProps) (ProfilePage);
export { profilePage as ProfilePage };
