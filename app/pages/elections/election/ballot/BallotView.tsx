import React, { useState } from 'react';
import { Election, Ticket, ActionTypes, submitBallot } from '~/datatypes';
import { View, Header5, Subtitle1, Button } from '~/components';
import { BallotEntryView } from './BallotEntryView';
import { Dialog } from '~/components/Dialog';
import { Header6 } from '~/components/text/Header6.native';
import { BallotEntryConfirmView } from './BallotEntryConfirmView';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ButtonGroup } from '~/components/ButtonGroup';

export interface BallotViewProps {
    election: Election;
}

function BallotView ({election}: BallotViewProps) {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    const [ dialogVisible, setDialogVisible ] = useState(false);
    const [ selectedTickets, setSelectedTickets ] = useState<Ticket[]>([]);
    return (
        <View>
            <Header5>{election.institutionName}</Header5>
            <Subtitle1>{election.displayName} - {election.term}</Subtitle1>
            <View>
                {election.ticketEntries.map((entry, idx) => 
                    <BallotEntryView key={idx} ticketEntry={entry} 
                        selected={selectedTickets[idx]?.id}
                        onChange={ticket => setSelectedTickets({...selectedTickets, [idx]: ticket})}
                        />)}
            </View>
            <View direction={"row"}>
                <Button onPress={() => setDialogVisible(true)}>Submit</Button>
            </View>
            <Dialog open={dialogVisible} actions={<ButtonGroup>
                <Button onPress={() => dispatch(submitBallot(election.id, selectedTickets.map(t => t.id)))}>Submit Ballot</Button>
                <Button onPress={() => setDialogVisible(false)}>Revise Ballot</Button>
            </ButtonGroup>}
                onClose={() => setDialogVisible(false)}
                title={<Header6>Please confirm your selections</Header6>}>
                {election.ticketEntries.map((entry, idx) => 
                    selectedTickets[idx] != undefined ?
                        <BallotEntryConfirmView key={idx} ticketEntry={entry} ticket={selectedTickets[idx]} /> : undefined)}
            </Dialog>
        </View>
    );
}
const ballotView = React.memo(BallotView);
export { ballotView as BallotView };
