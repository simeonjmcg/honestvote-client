import * as React from 'react';
import {Candidate} from '~/datatypes';
import {View, TextField, Button, Card} from '~/components';


export interface AdminCandidateViewProps {
    candidate : Candidate;
    onChange: (name: string) => void;
    onCandidateDelete?: (name?: string, candidateIndex?: number) => void; 
}

export function AdminCandidateView ({onChange, onCandidateDelete}: AdminCandidateViewProps) {
    return (
        <View>
            <Card>
                <TextField 
                    label = 'Candidate Name' 
                    onValueChange = { onChange } />
                
                <Button type="contained" onPress={onCandidateDelete}>Delete Candidate</Button>
            </Card>
        </View>
    );
}