import React from 'react';
import { connect } from 'react-redux';
import { Page, List, ListItem } from '~/components';
import {
    Election, ElectionActionTypes,
    requestElections, getElections, State,
} from '~/datatypes';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Dispatch } from 'redux';

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

const mapStateToProps = (state: State): StateProps => {
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