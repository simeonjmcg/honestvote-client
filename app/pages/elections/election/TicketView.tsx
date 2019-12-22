import * as React from 'react';
import { ElectionPosition, Ticket} from '~/datatypes';
import { PositionEntryView } from './PositionEntryView';
import { Text, View, Progress } from '~/components';
import { countVotes } from '~/utils';
import { TicketRow } from './components';

export interface TicketViewProps {
    index: number;
    total: number;
    max: number;
    ticket: Ticket;
    electionPositions: ElectionPosition[];
}

function TicketView ({index, ticket, electionPositions, total, max}: TicketViewProps) {
    const votes = countVotes(ticket.votes);
    const percentage = Math.round(votes / total * 100);
    return (
        <TicketRow index={ index }
            info={ 
                <View direction="row" centerSelf={true}>
                    <Text>{percentage}%</Text>
                    <Progress width={100} progress={votes / max} />
                </View>
            }>
            {ticket.electionPositionEntries.map((entry, k) => 
                <PositionEntryView key={k}
                    positionEntry={entry}
                    electionPositions={electionPositions}
                    multi={electionPositions.length !== 1} />)}
        </TicketRow>
    );
}

const ticketView = React.memo(TicketView);
export { ticketView as TicketView };