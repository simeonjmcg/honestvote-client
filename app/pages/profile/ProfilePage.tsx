import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationStackOptions } from 'react-navigation-stack';
import {
    Page, List, View,
} from '~/components';
import {
    Election, ElectionActionTypes,
    State,
    getElections,
    requestElections,
} from '~/datatypes';

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
                <List data={elections} renderRow={(row, index) => <View key={index}>{row.displayName}</View>} />
            </Page>
        );
    }
}

const mapStateToProps = (state: State): StateProps => ({
    elections: getElections(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ElectionActionTypes>): DispatchProps => ({
    requestElections: () => dispatch(requestElections()),
});

const profilePage = connect(mapStateToProps, mapDispatchToProps) (ProfilePage);
export { profilePage as ProfilePage };
