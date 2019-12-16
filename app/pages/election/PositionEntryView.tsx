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
import { useSelector, useDispatch } from 'react-redux';

export interface PositionEntryViewProps {
    positionEntry: ElectionPositionEntry;
    electionPositions: ElectionPosition[];
    multi: boolean;
}

export function PositionEntryView ({ positionEntry, electionPositions, multi }: PositionEntryViewProps) {
    // get dispatch function, pull candidates from redux
    const dispatch = useDispatch<Dispatch<CandidateActionTypes>>();
    const candidates = useSelector<State, Candidate[]>(state => getCandidates(state));

    // Getting object by id
    const candidate = findId(candidates, positionEntry.candidateId);
    const position = findId(electionPositions, positionEntry.electionPositionId);
    // run this when component mounts(like componentDidMount)
    useEffect(() => {dispatch(requestCandidates());}, []);
    return (
        <Text>
            {candidate ? candidate.fullName : "(unknown name)"}
            {multi ? `: ${position ? position.displayName : "(unknown position)"}` : ""}
        </Text>
    );
}