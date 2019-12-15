import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    List, Text, View,
} from '../../components';
import {
    TicketEntry, Ticket, ElectionPosition,
    State, ActionTypes,
    getTickets, getElectionPositions,
    requestTickets, requestElectionPositions,
} from '../../datatypes';
import { notUndefined, findId } from '../../utils';
import { TicketView } from './TicketView';

export interface TicketEntryViewProps extends StateProps, DispatchProps {
    ticketEntry: TicketEntry;
}

interface StateProps {
    tickets: Ticket[];
    electionPositions: ElectionPosition[];
}

interface DispatchProps {
    requestTickets: () => void;
    requestElectionPositions: () => void;
}

const TicketEntryView = ({
    ticketEntry, electionPositions, tickets,
    requestTickets, requestElectionPositions,
 }: TicketEntryViewProps) => {
    useEffect(() => {
        requestTickets();
        requestElectionPositions();
    }, []);
    const allowed = 
        ticketEntry.allowedElectionPositions
                   .map(pid => findId(electionPositions, pid))
                   .filter(notUndefined);
    const multiAllowed = electionPositions.length !== 1;
    return (
        <View>
            <Text>
                Position{multiAllowed ? "s" : ""}: {allowed.map(t => t.displayName).join(", ")}
            </Text>
            <List data={ticketEntry.tickets}
                renderRow={(id, k) =>
                    <TicketView key={k}
                        ticket={findId(tickets, id)}
                        electionPositions={allowed} />}
            />
        </View>
    );
}

const mapStateToProps = (state: State): StateProps => ({
    tickets: getTickets(state),
    electionPositions: getElectionPositions(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): DispatchProps => ({
    requestTickets: () => dispatch(requestTickets()),
    requestElectionPositions: () => dispatch(requestElectionPositions()),
});

const ticketEntryView = connect(mapStateToProps, mapDispatchToProps) (TicketEntryView);
export { ticketEntryView as TicketEntryView };