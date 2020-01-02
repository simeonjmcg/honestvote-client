import React, { useCallback, useState } from 'react';
import { Election } from '~/datatypes';
import { View, Header5, Subtitle1 } from '~/components';
import { TicketEntryView } from './TicketEntryView';
import { getDimensions } from '~/platformUtils';

export interface ElectionViewProps {
    election: Election;
}

function ElectionView ({election}: ElectionViewProps) {
    let { width } = getDimensions();
    
    const [ small, setSmall ] = useState(width < 930);
    const onResize = useCallback(() => {
        const { width } = getDimensions();
        setSmall(width < 930);
    }, []);
    return (
        <View>
            <Header5>{election.displayName || "Unknown"}</Header5>
            <Subtitle1>{election.term || "Unknown"}</Subtitle1>
            <View stretch={small} wrap={true} direction={small ? "column" : "row"} onResize={onResize}>
                {election.ticketEntries.map((entry, k) => <TicketEntryView key={k} ticketEntry={entry} small={small} />)}
            </View>
        </View>
    );
}
const electionView = React.memo(ElectionView);
export { electionView as ElectionView };