import React from 'react';
import { Election, ActionTypes, submitBallot } from '~/datatypes';
import { View, Header6, Subtitle1, Button, ButtonGroup, Dialog } from '~/components';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { BallotSelection } from './BallotView';
import { useRedirect } from '~/platformUtils';
import { mapMapArray } from '~/utils';

export interface BallotConfirmModalProps {
    election: Election;
    visible: boolean;
    onClose: () => void;
    selections: {[id: string]: BallotSelection};
}

export function BallotConfirmModal ({ election, visible, selections, onClose}: BallotConfirmModalProps) {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const redirectElection = useRedirect({
        to: `/election/${election.id}`,
        route: "Election",
        params: { id: election.id },
    });
    return (
        <Dialog open={visible} actions={
            <ButtonGroup>
                <Button type="contained" color="primary"
                onPress={() => {
                    dispatch(submitBallot(
                        election.id,
                        mapMapArray(selections, item => ({key: item.position.id, id: item.candidate.name }))));
                    redirectElection();
                }}>Submit</Button>
                <Button onPress={onClose} type="contained">Revise</Button>
            </ButtonGroup>}
            onClose={onClose}
            title={"Please confirm your selections"}>
            {mapMapArray(selections, (value, key) => <View key={key}>
                <Header6>{value.position.displayName}</Header6>
                <Subtitle1>{value.candidate.name}</Subtitle1>
            </View>)}
        </Dialog>
    );
}