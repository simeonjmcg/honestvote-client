import Websocket from 'isomorphic-ws';
import { WS_ENDPOINT, WebsocketTypes } from './types';
import { store } from './reduxStore';

export const websocket = new Websocket(WS_ENDPOINT);

websocket.onmessage = (data: WebsocketTypes) => {
    if (typeof data !== "object" || data == null)
        return;
    // specifically whitelisting redux actions from websocket
    switch (data.type) {
        case "VOTE_ADD":
            store.dispatch({ type: data.type, payload: data.payload });
            return;
        case "USER_CONFIRM_PERMISSION":
            store.dispatch({ type: data.type, payload: data.payload });
            return;
    }
}