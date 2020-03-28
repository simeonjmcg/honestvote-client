import React, { useState } from 'react';
import { Election, ElectionPosition, Candidate } from '~/datatypes';
import { View, Header5, Subtitle1, Button } from '~/components';
import { BallotPositionView } from './BallotPositionView';
import { BallotConfirmModal } from './BallotConfirmModal';

export interface BallotViewProps {
    election: Election;
}

export interface BallotSelection {
    position: ElectionPosition;
    candidate: Candidate;
}

function BallotView ({election}: BallotViewProps) {
    const [ dialogVisible, setDialogVisible ] = useState(false);
    const [ selections, setSelections ] = useState<{[id: string]: BallotSelection}>({});
    return (
        <View>
            <Header5>{election.institutionName}</Header5>
            <Subtitle1>{election.electionName} - {election.description}</Subtitle1>
            <View>
                {election.positions.map((position) => 
                    <BallotPositionView key={position.id} position={position} 
                        selected={selections[position.id]?.candidate.key}
                        onChange={candidate => setSelections({ ...selections, 
                            [position.id]: { position, candidate },
                        })} />)}
            </View>
            <View direction={"row"}>
                <Button onPress={() => setDialogVisible(true)} type="contained" color="primary">Submit</Button>
            </View>
            <BallotConfirmModal
                election={election}
                visible={dialogVisible}
                selections={selections}
                onClose={() => setDialogVisible(false)}/>
        </View>
    );
}
const ballotView = React.memo(BallotView);
export { ballotView as BallotView };
