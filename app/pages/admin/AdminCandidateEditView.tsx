import * as React from 'react';
import {Candidate} from '~/datatypes';
import {View, TextField, Button} from '~/components';
import {PositionView} from '../elections/election/PositionView';


export interface AdminCandidateEditViewProps {
    candidate : Candidate;
    onChange: (name: string) => void;
    onCandidateDelete: (name?: string, candidateIndex?: number) => void; 
}

export function AdminCandidateEditView ({onChange, onCandidateDelete}: AdminCandidateEditViewProps) {
    return (
        <View>
            <TextField 
                label = 'Candidate Name' 
                value = {PositionView.name} 
                onValueChange = { onChange } />
            
            <Button type="contained" onPress={onCandidateDelete}>Delete Candidate</Button>
        </View>
    );
}
