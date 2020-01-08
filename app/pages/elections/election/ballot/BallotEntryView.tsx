import React from 'react';
import { useSelector } from 'react-redux';
import { Text, Header6, Card } from '~/components';
import {
    TicketEntry,
    getTickets, getElectionPositions, Ticket, TicketId,
} from '~/datatypes';
import { mapIdList } from '~/utils';
import { BallotChoiceView } from './BallotChoiceView';

export interface BallotEntryViewProps {
    ticketEntry: TicketEntry;
    onChange?: (ticket: Ticket) => void;
    selected?: TicketId | undefined;
}

function BallotEntryView ({ ticketEntry, selected, onChange }: BallotEntryViewProps) {

    // get redux values
    const electionPositions = useSelector(getElectionPositions);
    const tickets = useSelector(getTickets);

    const allowed = mapIdList(ticketEntry.allowedElectionPositions, electionPositions);
    const mappedTickets = mapIdList(ticketEntry.tickets, tickets);
    return (
        <Card title={<Header6>{allowed.map(t => t.displayName).join(", ")}</Header6>}>
            {mappedTickets.map((ticket, idx) => {
                return ticket ? 
                    <BallotChoiceView key={idx}
                        ticket={ticket}
                        selected={selected === ticket.id}
                        onPress={() => onChange?.(ticket)}
                        electionPositions={allowed} />
                    : <Text key={idx}>Ticket not found!</Text>;
            })}
        </Card>
    );
}

const ballotEntryView = React.memo(BallotEntryView);
export { ballotEntryView as BallotEntryView };
