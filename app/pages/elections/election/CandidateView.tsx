import * as React from 'react';
import { Candidate } from '~/datatypes';
import { Text, View, Progress } from '~/components';
import { RowItem } from './components';

export interface CandidateViewProps {
    index: number;
    total: number;
    max: number;
    votes: number
    candidate: Candidate;
}

export function CandidateView ({index, candidate, votes, total, max}: CandidateViewProps) {
    const percentage = Math.round(votes / total * 100);
    return (
        <RowItem left={<Text>{ index + 1}</Text>}
            right={ 
                <View direction="row" centerSelf={true}>
                    <Text>{percentage}%</Text>
                    <Progress width={100} progress={votes / max} />
                </View>
            }>
                <Text>{candidate.name}</Text>
        </RowItem>
    );
}