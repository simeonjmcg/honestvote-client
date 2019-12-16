import * as React from 'react';
import { ElectionPosition, Ticket} from '../../datatypes';
import { View } from '../../components';
import { PositionEntryView } from './PositionEntryView';

export interface TicketViewProps {
    ticket: Ticket;
    electionPositions: ElectionPosition[];
}

export const TicketView = ({ticket, electionPositions}: TicketViewProps) => 
    <View>
        {ticket.electionPositionEntries.map((entry, k) => 
            <PositionEntryView key={k}
                positionEntry={entry}
                electionPositions={electionPositions}
                multi={electionPositions.length !== 1} />)}
    </View>;