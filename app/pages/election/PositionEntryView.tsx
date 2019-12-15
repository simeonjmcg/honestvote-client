import React, { useEffect } from 'react';
import { Text } from '../../components';
import { 
    Candidate, CandidateActionTypes,
    ElectionPosition, ElectionPositionEntry,
    State,
    getCandidates, requestCandidates,
 } from '../../datatypes';
import { findId } from '../../utils';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface PositionEntryViewProps extends StateProps, DispatchProps {
    positionEntry: ElectionPositionEntry;
    electionPositions: ElectionPosition[];
    multi: boolean;
}

interface StateProps {
    candidates: Candidate[];
}

interface DispatchProps {
    requestCandidates: () => void;
}

function PositionEntryView ({
    positionEntry, candidates, electionPositions, multi,
    requestCandidates,
}: PositionEntryViewProps) {
    // Getting object by id
    const candidate = findId(candidates, positionEntry.candidateId);
    const position = findId(electionPositions, positionEntry.electionPositionId);
    // run this when component mounts(like componentDidMount)
    useEffect(() => {requestCandidates()}, []);
    return (
        <Text>
            {candidate ? candidate.fullName : "(unknown name)"}
            {multi ? `: ${position ? position.displayName : "(unknown position)"}` : ""}
        </Text>
    );
}

const mapStateToProps = (state: State): StateProps => 
    ({ candidates: getCandidates(state) });

const mapDispatchToProps = (dispatch: Dispatch<CandidateActionTypes>): DispatchProps =>
    ({ requestCandidates: () => dispatch(requestCandidates()) });

const positionEntryView = connect(mapStateToProps, mapDispatchToProps) (PositionEntryView);
export { positionEntryView as PositionEntryView };