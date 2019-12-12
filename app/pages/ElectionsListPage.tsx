import React from 'react';
import { Page } from '../components/Page';
import { AppState, ActionTypes } from '../datatypes/types';
import { List } from '../components/List';
import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { requestElections } from '../datatypes/actions';
import { getElections } from '../datatypes/accessors';
import { Dispatch } from 'redux';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Election } from '../datatypes/elections/types';

export type ElectionsListPageProps = StateProps & DispatchProps;

interface StateProps {
    elections: Election[];
}

interface DispatchProps {
    requestElections: () => ActionTypes;
}

class ElectionsListPage extends React.PureComponent<ElectionsListPageProps> {
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

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): DispatchProps => {
    return {
        requestElections: () => dispatch(requestElections()),
    };
}

const electionsListPage = connect(mapStateToProps, mapDispatchToProps) (ElectionsListPage);
export { electionsListPage as ElectionsListPage };