import React, { useState } from 'react';
import { Card, Button, Text, View, Header5 } from '~/components';
import { useSelector, useDispatch } from 'react-redux';
import { isPromptingNewPass, AppActionTypes, returnPass, cancelPass, getPromptMessage } from '~/datatypes';
import { TextField } from '~/components/TextField';
import { Dispatch } from 'redux';
import { ButtonGroup } from '~/components/ButtonGroup';

function PromptPassModal () {
    const dispatch = useDispatch<Dispatch<AppActionTypes>>();
    const newPass = useSelector(isPromptingNewPass);
    const promptMessage = useSelector(getPromptMessage);
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ pass, setPass ] = useState("");
    const [ confirmPass, setConfirmPass ] = useState("");
    return (
        <Card title={<Header5>Enter Passcode</Header5>} width={300}>
            <Text>{ promptMessage }</Text>
            <View><TextField label="Passcode" onValueChange={setPass} /></View>
            { newPass && <View><TextField label="Confirm passcode" onValueChange={setConfirmPass} /></View>}
            <Text color="red">{ error }</Text>
            <ButtonGroup>
                <Button onPress={() => {
                    if (newPass) {
                        if (pass === confirmPass) {
                            dispatch(returnPass(pass));
                        } else {
                            setError("Passcodes do not match.");
                        }
                    } else {
                        dispatch(returnPass(pass));
                    }
                }}>Submit</Button>
                <Button onPress={ () => dispatch(cancelPass()) }>Cancel</Button>
            </ButtonGroup>
        </Card>
    );
}

const promptPassModal = React.memo(PromptPassModal);
export { promptPassModal as PromptPassModal };
