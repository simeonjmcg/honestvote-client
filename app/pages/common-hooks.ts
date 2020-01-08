import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ActionTypes, requestClosestNode, retreivePublicKey } from "~/datatypes";

/** Hooks for anything that is common between all screens on all platforms */
export function useCommon() {
    const dispatch = useDispatch<Dispatch<ActionTypes>>();
    useEffect(() => {
        dispatch(requestClosestNode());
        dispatch(retreivePublicKey());
    }, []);
}