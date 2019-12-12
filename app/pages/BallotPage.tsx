import React from 'react';
import { Page } from '../components/Page';
import { AppState } from '../datatypes/types';
import { List } from '../components/List';
import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { requestElections } from '../datatypes/actions';
import { getElections } from '../datatypes/accessors';
import { Dispatch } from 'redux';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Election, ElectionActionTypes } from '../datatypes/elections/types';

export type BallotPageProps = StateProps & DispatchProps;

interface StateProps {
    elections: Election[];
}

interface DispatchProps {
    requestElections: () => ElectionActionTypes;
}

class BallotPage extends React.PureComponent<BallotPageProps> {
    public static navigationOptions: NavigationStackOptions = {
        title: 'Ballot',
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

const ballotPage = connect(mapStateToProps, mapDispatchToProps) (BallotPage);
export { ballotPage as BallotPage };