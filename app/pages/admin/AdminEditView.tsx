import React from 'react';
import { Header6, Card, TextField } from '~/components';
import { ElectionPosition } from '~/datatypes';
import { AdminCandidateEditView } from './AdminCandidateEditView';

export interface AdminEditViewProps {
    position: ElectionPosition;
    onChange: (positionName: string) => void; 
    onCandidateDelete: ( name: string, candidateIndex: number) => void; 
    onCandidateChange: ( name: string, candidateIndex: number) => void;
}

export function AdminEditView ({position, onCandidateDelete, onCandidateChange, onChange}: AdminEditViewProps) {
    const candidates = position.candidates;

    return (
        <Card title={<Header6>{position.displayName}</Header6>}>
            <TextField
            label = 'Position Name' 
            onValueChange = { onChange } />
          
            {candidates.map((candidate, index) =>
              <AdminCandidateEditView 
                candidate = { candidate }
                onChange = {() => onCandidateChange ( candidate.name, index )}
                onCandidateDelete = {() => onCandidateDelete ( candidate.name, index )} />
            )}
        </Card>
     
    );
}