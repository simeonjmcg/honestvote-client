import * as React from 'react';
import {ElectionPosition} from '~/datatypes';
import {View, TextField, Button, Header5, Card} from '~/components';
import {AdminCandidateView} from './AdminCandidateView';

export interface AdminPositionViewProps {
    electionPosition: ElectionPosition;
    onChange: (positionName: string) => void; 
    onDelete: () => void;
    onCandidateAdd: () => void;
    onCandidateDelete: (candidateIndex: number) => void; 
    onCandidateChange: (name: string, candidateIndex: number) => void;
}

export function AdminPositionView ({electionPosition, onChange, onDelete, onCandidateChange, onCandidateAdd, onCandidateDelete}: AdminPositionViewProps) {
   
    return (
        <View>   
            <TextField
                label = 'Position Name' 
                initialValue = {electionPosition.displayName}
                onInputBlur = { onChange } />
          
            <Card title={<Header5>Candidates</Header5>}>
                {electionPosition.candidates.map((candidate, index) =>
                            <AdminCandidateView 
                            key = { candidate.name }
                            candidate = { candidate }
                            onChange = {value => onCandidateChange (value, index)}
                            onDelete = {() => onCandidateDelete (index)} />,
                )}
                <View direction="row">
                    <Button type="contained" onPress={onCandidateAdd}>Add Candidate</Button>
                </View>
                <View direction="row">
                    <Button type="contained" onPress={onDelete}>Delete Position</Button>
                </View>
            </Card>
         </View>
    );
}