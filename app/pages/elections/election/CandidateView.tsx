import React from "react";
import {Candidate} from "~/datatypes";
import {Text, View, Progress} from "~/components";
import {RowItem} from "./components";

export interface CandidateViewProps {
    index: number;
    total: number;
    max: number;
    votes: number
    candidate: Candidate;
    started?: boolean
}

export function CandidateView ({index, candidate, votes, total, max, started}: CandidateViewProps) {
    const percentage = total === 0 ? 0 : Math.round(votes / total * 100);
    const progress = max === 0 ? 0 : votes / max;
    return (
        <RowItem left={<Text>{ index + 1}</Text>}
            right={ 
                started && <View direction="row" centerSelf={true}>
                    <Text>{percentage}%</Text>
                    <Progress width={100} progress={progress} />
                </View>
            }>
            <Text>{candidate.name}</Text>
        </RowItem>
    );
}