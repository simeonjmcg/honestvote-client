import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Card, Header6 } from '../../components';
import {
    TicketEntry, Ticket, ElectionPosition,
    State, ActionTypes,
    getTickets, getElectionPositions,
    requestTickets, requestElectionPositions,
} from '../../datatypes';
import { notUndefined, findId } from '../../utils';
import { TicketView } from './TicketView';
import { Dispatch } from 'redux';

export interface TicketEntryViewProps {
    ticketEntry: TicketEntry;
}

export const TicketEntryView = ({ ticketEntry }: TicketEntryViewProps) => {
    // get redux dispatcher
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    // get redux values
    const electionPositions = useSelector<State, ElectionPosition[]>(state => getElectionPositions(state));
    const tickets = useSelector<State, Ticket[]>(state => getTickets(state));

    // executed onMount
    useEffect(() => {
        dispatch(requestTickets());
        dispatch(requestElectionPositions());
    }, []);
    const allowed = 
        ticketEntry.allowedElectionPositions
                   .map(pid => findId(electionPositions, pid))
                   .filter(notUndefined);
    return (
        <Card title={<Header6>{allowed.map(t => t.displayName).join(", ")}</Header6>}>
            {ticketEntry.tickets.map((id, k) => {
                const ticket = findId(tickets, id);
                return ticket ? 
                    <TicketView key={k}
                        ticket={ticket}
                        electionPositions={allowed} />
                    : <Text key={k}>Ticket not found!</Text>;
            })}
        </Card>
    );
}