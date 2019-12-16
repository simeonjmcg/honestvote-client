import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Text, View, ListItem } from '../../components';
import {
    TicketEntry, Ticket, ElectionPosition,
    State, ActionTypes,
    getTickets, getElectionPositions,
    requestTickets, requestElectionPositions,
} from '../../datatypes';
import { notUndefined, findId } from '../../utils';
import { TicketView } from './TicketView';

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
    const multiAllowed = electionPositions.length !== 1;
    return (
        <View>
            <Text>
                Position{multiAllowed ? "s" : ""}: {allowed.map(t => t.displayName).join(", ")}
            </Text>
            <List data={ticketEntry.tickets}
                  keyExtractor={(_, index) => index+""}
                  renderRow={(id, k) => {
                    const ticket = findId(tickets, id);
                    return <ListItem>
                        {ticket ? 
                            <TicketView key={k}
                                ticket={ticket}
                                electionPositions={allowed} />
                            : <Text>Ticket not found!</Text>}
                    </ListItem>}}
            />
        </View>
    );
}