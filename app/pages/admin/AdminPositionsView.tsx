import * as React from 'react';
import {ElectionPosition} from '~/datatypes';
import {Card, View, Button, Header5} from '~/components';
import {AdminPositionView} from './AdminPositionView';

export interface AdminPositionViewProps {
    electionPositions: ElectionPosition[];
    onPositionChange: (positionName: string, positionIndex: number) => void; 
    onPositionDelete: (positionIndex: number) => void;
    onPositionAdd: () => void;
    onCandidateAdd: (positionIndex: number) => void;
    onCandidateDelete: (positionIndex: number, candidateIndex: number) => void; 
    onCandidateChange: (name: string, positionIndex: number, candidateIndex: number) => void;
}

export function AdminPositionsView ({electionPositions, onPositionChange, onPositionDelete, onPositionAdd, onCandidateChange, onCandidateAdd, onCandidateDelete}: AdminPositionViewProps) {
   
    return (
         <Card title={<Header5>Positions</Header5>}>
            {electionPositions.map((electionPosition, positionIndex) => 
                <AdminPositionView
                    key={electionPosition.id}
                    electionPosition = {electionPosition} 
                    onChange = {positionName => onPositionChange(positionName, positionIndex)}
                    onDelete = {() => onPositionDelete(positionIndex)}
                    onCandidateAdd = {() => onCandidateAdd(positionIndex)}
                    onCandidateDelete = {candidateIndex => onCandidateDelete(positionIndex, candidateIndex)}
                    onCandidateChange = {(candidateName, candidateIndex) => onCandidateChange(candidateName, positionIndex, candidateIndex)} />)}
            <View direction="row">
                <Button type="contained" onPress={onPositionAdd}>Add Position</Button>
            </View>
        </Card>
    );
}