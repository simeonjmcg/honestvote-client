import * as React from 'react';
import { Candidate} from '~/datatypes';
import { View, Text } from '~/components';
import { Radio } from '~/components/Radio';
import { RowItem } from '../components';

export interface BallotChoiceViewProps {
    candidate: Candidate;
    selected?: boolean;
    onPress?: () => void;
}

export function BallotChoiceView ({candidate, onPress, selected}: BallotChoiceViewProps) {
    return (
        <View>
            <RowItem left={<View><Radio value={candidate.key} checked={selected} onPress={onPress} /></View>}>
                <Text onPress={onPress}>{candidate.name}</Text>
            </RowItem>
        </View>
    );
}