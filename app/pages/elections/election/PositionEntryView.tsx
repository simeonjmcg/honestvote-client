import React from 'react';
import { Text } from '~/components';
import { 
    ElectionPosition, ElectionPositionEntry,
    getCandidates, areCandidatesLoaded, arePositionsLoaded,
 } from '~/datatypes';
import { findId } from '~/utils';
import { useSelector } from 'react-redux';

export interface PositionEntryViewProps {
    positionEntry: ElectionPositionEntry;
    electionPositions: ElectionPosition[];
    multi: boolean;
}

function PositionEntryView ({ positionEntry, electionPositions, multi }: PositionEntryViewProps) {
    // get candidates from redux
    const candidates = useSelector(getCandidates);

    // Get isLoading for candidates and positions
    const isLoadedCandidates = useSelector(areCandidatesLoaded);
    const isLoadedPositions = useSelector(arePositionsLoaded);
    // Getting object by id
    const candidate = findId(candidates, positionEntry.candidateId);
    const position = findId(electionPositions, positionEntry.electionPositionId);
    return (
        <Text>
            {!isLoadedCandidates ? "Loading..." :
            candidate            ? candidate.fullName :
                                   "(unknown name)"}
            {multi ? `: ${!isLoadedPositions ? "Loading..." :
                          position           ? position.displayName :
                                               "(unknown position)"}` :
                     ""}
        </Text>
    );
}

const positionEntryView = React.memo(PositionEntryView);
export { positionEntryView as PositionEntryView };