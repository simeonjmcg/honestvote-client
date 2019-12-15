import * as React from 'react';
import {
    ElectionPosition, Ticket,
} from '../../datatypes';
import {
    ListItem, Text,
} from '../../components';
import { PositionEntryView } from './PositionEntryView';

export interface TicketViewProps {
    ticket: Ticket | undefined;
    electionPositions: ElectionPosition[];
}

export const TicketView = ({ticket, electionPositions}: TicketViewProps) => 
    <ListItem>
        {ticket ? ticket.electionPositionEntries.map((entry, k) => 
            <PositionEntryView key={k}
                positionEntry={entry}
                electionPositions={electionPositions}
                multi={electionPositions.length !== 1} />)
            : <Text>Ticket not found!</Text>}
    </ListItem>;