import React from 'react';
import { useSelector } from 'react-redux';
import { Text, Card, Header6 } from '~/components';
import {
    TicketEntry,
    getTickets, getElectionPositions,
} from '~/datatypes';
import { mapIdList, sortTickets, sumTicketsVotes, countVotes } from '~/utils';
import { TicketView } from './TicketView';
import { RowItem } from './components';

export interface TicketEntryViewProps {
    ticketEntry: TicketEntry;
    small?: boolean;
}

function TicketEntryView ({ ticketEntry, small }: TicketEntryViewProps) {
    // get redux values
    const electionPositions = useSelector(getElectionPositions);
    const tickets = useSelector(getTickets);

    const allowed = mapIdList(ticketEntry.allowedElectionPositions, electionPositions);
    const mappedTickets = mapIdList(ticketEntry.tickets, tickets);
    const totalVotes = sumTicketsVotes(mappedTickets);
    const orderedTickets = sortTickets(mappedTickets);
    const max = orderedTickets.length !== 0 ?
        countVotes(orderedTickets[0].votes) : 0;
    return (
        <Card minWidth={!small ? 400 : undefined}
            title={
                <RowItem right={<Text>{totalVotes} votes</Text>}>
                    <Header6>{allowed.map(t => t.displayName).join(", ")}</Header6>
                </RowItem>
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