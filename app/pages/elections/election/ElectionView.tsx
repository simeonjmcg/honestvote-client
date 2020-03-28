import React, { useCallback, useState } from 'react';
import {
    Election,
    getIsUserRegistered, getIsPermissionRequestActive,
    getCanUserVote, getIsElectionEnded, getHasUserVoted,
    openedStateString,
    getIsElectionStarted,
} from '~/datatypes';
import { View, Header5, Subtitle1, Text, ButtonLink, Link } from '~/components';
import { PositionView } from './PositionView';
import { getDimensions } from '~/platformUtils';
import { useSelector } from 'react-redux';

export interface ElectionViewProps {
    election: Election;
}

function ElectionView ({election}: ElectionViewProps) {
    let { width } = getDimensions();
    
    const [ small, setSmall ] = useState(width < 930);
    const onResize = useCallback(() => {
        const { width } = getDimensions();
        setSmall(width < 930);
    }, []);

    const n = Date.now();
    const isStarted = useSelector(getIsElectionStarted(election, n));
    const isEnded = useSelector(getIsElectionEnded(election, n));
    const canVote = useSelector(getCanUserVote(election, n));
    const hasVoted = useSelector(getHasUserVoted(election));
    const isRegistered = useSelector(getIsUserRegistered(election));
    const isRegistrationPending = useSelector(getIsPermissionRequestActive(election));
    return (
        <View>
            <Header5>{election.institutionName}</Header5>
            <Subtitle1>{election.electionName} - {election.description}</Subtitle1>
            {<Text>{openedStateString(election)}</Text>}
            {canVote ?
                <View direction="row">
                    <ButtonLink type="contained" color="primary"
                        to={`/election/${election.id}/ballot`}
                        route="Ballot"
                        params={{id: election.id}}>
                        Vote
                    </ButtonLink>
                </View> :
            hasVoted ?
                <Text> You have voted in this election.</Text> :
            isRegistrationPending && !isEnded ?
                <Text>
                    Registration is pending. You may need to check your email, or
                    {" "}
                    <Link 
                        to={`/election/${election.id}/registration`}
                        route="Registration"
                        params={{id: election.id}}>click here</Link>
                    {" "}
                    to resubmit registration request.
                </Text> :
            !isRegistered && !isEnded?
                <View direction="row">
                    <ButtonLink type="contained" color="primary"
                        to={`/election/${election.id}/registration`}
                        route="Registration"
                        params={{id: election.id}}>
                        Register
                    </ButtonLink>
                </View> : undefined
            }
            <View stretch={small} wrap={true} direction={small ? "column" : "row"} onResize={onResize}>
                {election.positions.map((position, k) =>
                    <PositionView key={k}
                        electionId={election.id}
                        position={position}
                        small={small} started={isStarted} />)}
            </View>
        </View>
    );
}
const electionView = React.memo(ElectionView);
export { electionView as ElectionView };