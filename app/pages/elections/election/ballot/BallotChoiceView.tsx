import * as React from 'react';
import { ElectionPosition, Ticket} from '~/datatypes';
import { PositionEntryView } from '../PositionEntryView';
import { View, Text } from '~/components';
import { Radio } from '~/components/Radio';
import { RowItem } from '../components';

export interface TicketViewProps {
    ticket: Ticket;
    electionPositions: ElectionPosition[];
    selected?: boolean;
    onPress?: () => void;
}

function BallotChoiceView ({ticket, electionPositions, onPress, selected}: TicketViewProps) {
    return (
        <View>
            {ticket.electionPositionEntries.map((entry, k) => 
            <RowItem left={<Text><Radio value={ticket.id} checked={selected} onPress={onPress} /></Text>}>
                <PositionEntryView key={k}
                    onPress={onPress}
                    positionEntry={entry}
                    electionPositions={electionPositions}
                    multi={electionPositions.length !== 1} />
            </RowItem>)}
        </View>
    );
}

const ballotChoiceView = React.memo(BallotChoiceView);
export { ballotChoiceView as BallotChoiceView };
