import React from 'react';
import { useSelector } from 'react-redux';
import { Text, Card, Header6 } from '~/components';
import {
    ElectionPosition, ElectionId, getVotes, countVotesByPositionId, voteCountByCandidate, sortCandidatesByVoteCount,
} from '~/datatypes';
import { RowItem } from './components';
import { CandidateView } from './CandidateView';

export interface PositionViewProps {
    electionId: ElectionId;
    position: ElectionPosition;
    started?: boolean;
    small?: boolean;
}

export function PositionView ({ electionId, position, started, small }: PositionViewProps) {
    // get redux values
    const votes = useSelector(getVotes(electionId));
    const candidates = position.candidates;
    const totalVotes = countVotesByPositionId(votes, position.id);

    const votesById = voteCountByCandidate(votes);
    const orderedCandidates = sortCandidatesByVoteCount(candidates, votesById);
    const max = orderedCandidates.length !== 0 ?
        votesById[orderedCandidates[0].key] ?? 0 : 0;
    return (
        <Card minWidth={!small ? 400 : undefined}
            title={
                <RowItem right={started && <Text>{totalVotes} votes</Text>}>
                    <Header6>{position.positionName}</Header6>
                </RowItem>
            }>
            {orderedCandidates.map((candidate, idx) =>
                    <CandidateView key={idx}
                        total={totalVotes}
                        max={max}
                        index={idx}
                        votes={votesById[candidate.key] ?? 0}
                        candidate={candidate} started={started}/>
            )}
        </Card>
    );
}