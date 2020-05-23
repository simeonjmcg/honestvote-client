import * as React from 'react';
import { ElectionPosition } from '~/datatypes';
import { View, TextField, Button, Header5 } from '~/components';
import { AdminCandidateView } from './AdminCandidateView';

export interface AdminPositionViewProps {
    electionPosition: ElectionPosition;
    onChange: (positionName: string) => void; 
    onCandidateAdd: () => void;
    onCandidateDelete: ( name: string, candidateIndex: number) => void; 
    onCandidateChange: ( name: string, candidateIndex: number) => void;
}

export function AdminPositionView ({electionPosition, onChange, onCandidateChange, onCandidateAdd, onCandidateDelete}: AdminPositionViewProps) {
   
    return (
        <View>   
            <TextField
                label = 'Position Name' 
                onValueChange = { onChange } />
          
            <Header5>Candidates</Header5>
            { electionPosition.candidates.map((candidate, index) =>
                        <AdminCandidateView 
                        candidate = { candidate }
                        onChange = {() => onCandidateChange ( candidate.name, index )}
                        onCandidateDelete = {() => onCandidateDelete ( candidate.name, index )} />
            )}
            <Button type="contained" onPress={onCandidateAdd}>Add Candidate</Button>
           
            
         </View>
    );
}