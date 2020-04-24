import React from "react";
import { Header6, Card } from "~/components";
import { BallotChoiceView } from "./BallotChoiceView";
import { ElectionPosition, Candidate, CandidateId } from "~/datatypes";

export interface BallotPositionViewProps {
    position: ElectionPosition
    onChange?: (candidate: Candidate) => void;
    selected?: CandidateId | undefined;
}

export function BallotPositionView ({ position, selected, onChange }: BallotPositionViewProps) {
    const candidates = position.candidates;
    return (
        <Card title={<Header6>{position.displayName}</Header6>}>
            {candidates.map((candidate, idx) =>
                <BallotChoiceView key={idx}
                    candidate={candidate}
                    selected={selected === candidate.key}
                    onPress={() => onChange?.(candidate)} />
            )}
        </Card>
    );
}