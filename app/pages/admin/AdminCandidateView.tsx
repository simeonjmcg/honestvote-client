import * as React from 'react';
import {Candidate} from '~/datatypes';
import {View, TextField, Button} from '~/components';


export interface AdminCandidateViewProps {
    candidate : Candidate;
    onChange: (value: string) => void;
    onDelete?: () => void; 
}

export function AdminCandidateView ({candidate, onChange, onDelete}: AdminCandidateViewProps) {
    return (
        <View direction="row">
            <TextField 
                label = 'Candidate Name' 
                initialValue = {candidate.name}
                onInputBlur = {onChange} />
            
            <Button type="contained" onPress={onDelete}>Delete Candidate</Button>
        </View>
    );
}