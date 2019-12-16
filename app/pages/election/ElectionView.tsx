import * as React from 'react';
import { Election} from '../../datatypes';
import { View, Header5, Subtitle1, FlexWrapBox } from '../../components';
import { TicketEntryView } from './TicketEntryView';

export interface ElectionViewProps {
    election: Election;
}

export const ElectionView = ({election}: ElectionViewProps) => 
    <View>
        <Header5>{election.displayName || "Unknown"}</Header5>
        <Subtitle1>{election.term || "Unknown"}</Subtitle1>
        <FlexWrapBox>
            {election.ticketEntries.map((entry, k) => <TicketEntryView key={k} ticketEntry={entry} />)}
        </FlexWrapBox>
    </View>;