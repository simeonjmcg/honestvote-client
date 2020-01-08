import React from 'react';
import { useSelector } from 'react-redux';
import { Header6, View } from '~/components';
import {
    TicketEntry,
    getElectionPositions, Ticket,
} from '~/datatypes';
import { mapIdList } from '~/utils';
import { PositionEntryView } from '../PositionEntryView';

export interface BallotEntryConfirmViewProps {
    ticketEntry: TicketEntry;
    ticket: Ticket;
}

function BallotEntryConfirmView ({ ticketEntry, ticket }: BallotEntryConfirmViewProps) {
    // get redux values
    const electionPositions = useSelector(getElectionPositions);
    const allowed = mapIdList(ticketEntry.allowedElectionPositions, electionPositions);
    return (
        <View>
            <Header6>{allowed.map(t => t.displayName).join(", ")}</Header6>
            {ticket.electionPositionEntries.map((entry, k) => 
                <PositionEntryView key={k}
                    positionEntry={entry}
                    electionPositions={allowed}
                    multi={allowed.length !== 1} />)}
        </View>
    );
}

const ballotEntryConfirmView = React.memo(BallotEntryConfirmView);
export { ballotEntryConfirmView as BallotEntryConfirmView };
