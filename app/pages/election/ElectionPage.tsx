import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import { getParamFromProps } from '../../utils';
import {
    ElectionActionTypes,
    State,
    Election, ElectionId,
    requestElection,
    getElection,
} from '../../datatypes';
import {
    Text, Page, View
} from '../../components';
import { TicketEntryView } from './TicketEntryView';

export type ElectionPageProps =
    StateProps & DispatchProps & // redux props
    NavigationStackScreenProps & RouteChildrenProps; // NavigationStack for native, Router for web

interface StateProps {
    election: Election | undefined;
}

interface DispatchProps {
    requestElection: (id: ElectionId) => void;
}

class ElectionPage extends React.PureComponent<ElectionPageProps> {
    public static navigationOptions: NavigationStackOptions = {
        title: 'Election',
    };

    public componentDidMount() {
        this.props.requestElection(getParamFromProps(this.props, "id"));
    }
    public render(): React.ReactElement {
        const { election } = this.props;
        return (
            <Page>
                { election ? <View>
                    <Text>{election.displayName || "Unknown"}</Text>
                    <Text>{election.term || "Unknown"}</Text>
                    {election.ticketEntries.map((entry, k) =>
                        <TicketEntryView key={k} ticketEntry={entry} />)}
                </View> : <Text>Election not found!</Text>}
            </Page>
        );
    }
}

const mapStateToProps = (state: State, props: ElectionPageProps): StateProps =>
     ({ election: getElection(state, getParamFromProps(props, "id")) });

const mapDispatchToProps = (dispatch: Dispatch<ElectionActionTypes>): DispatchProps =>
    ({ requestElection: (id: ElectionId) => dispatch(requestElection(id)) });

const electionPage = connect(mapStateToProps, mapDispatchToProps) (ElectionPage);
export { electionPage as ElectionPage };