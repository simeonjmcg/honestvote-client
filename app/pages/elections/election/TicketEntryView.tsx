import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Card, Header6 } from '../../../components';
import {
    TicketEntry, Ticket, ElectionPosition,
    State, ActionTypes,
    getTickets, getElectionPositions,
    requestTickets, requestElectionPositions,
} from '../../../datatypes';
import { mapIdList, sortTickets, sumTicketsVotes, countVotes } from '../../../utils';
import { TicketView } from './TicketView';
import { Dispatch } from 'redux';
import { TicketRow } from './components';

export interface TicketEntryViewProps {
    ticketEntry: TicketEntry;
}

function TicketEntryView ({ ticketEntry }: TicketEntryViewProps) {
    // get redux dispatcher
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    // get redux values
    const electionPositions = 
        useSelector<State, ElectionPosition[]>(state => getElectionPositions(state));
    const tickets = 
        useSelector<State, Ticket[]>(state => getTickets(state));

    // executed onMount
    useEffect(() => {
        dispatch(requestTickets());
        dispatch(requestElectionPositions());
    }, []);
    const allowed = mapIdList(ticketEntry.allowedElectionPositions, electionPositions);
    const mappedTickets = mapIdList(ticketEntry.tickets, tickets);
    const totalVotes = sumTicketsVotes(mappedTickets);
    const orderedTickets = sortTickets(mappedTickets);
    const max = orderedTickets.length !== 0 ?
        countVotes(orderedTickets[0].votes) : 0;
    return (
        <Card minWidth={300}
            title={
                <TicketRow info={<Text>{totalVotes} votes</Text>}>
                    <Header6>{allowed.map(t => t.displayName).join(", ")}</Header6>
                </TicketRow>
            }>
            {orderedTickets.map((ticket, idx) => {
                return ticket ? 
                    <TicketView key={idx}
                        total={totalVotes}
                        max={max}
                        index={idx}
                        ticket={ticket}
                        electionPositions={allowed} />
                    : <Text key={idx}>Ticket not found!</Text>;
            })}
        </Card>
    );
}

const ticketEntryView = React.memo(TicketEntryView);
export { ticketEntryView as TicketEntryView };