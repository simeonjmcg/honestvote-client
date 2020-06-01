import {slugify} from "~/utils";
import {ElectionPosition} from "~/datatypes";

export type AdminCreateState = ElectionPosition[];
interface AddPosition {
    type: "add-position";
}
interface DeletePosition {
    type: "delete-position";
    payload: { positionIndex: number };
}
interface SetPosition {
    type: "set-position";
    payload: {positionIndex: number, value: string};
}

interface AddCandidate {
    type: "add-candidate";
    payload: {positionIndex: number};
}
interface DeleteCandidate {
    type: "delete-candidate";
    payload: {positionIndex: number, candidateIndex: number};
}
interface SetCandidate {
    type: "set-candidate";
    payload: {positionIndex: number, candidateIndex: number, value: string};
}
export type AdminCreateActions = AddPosition  | DeletePosition  | SetPosition |
                                 AddCandidate | DeleteCandidate | SetCandidate;

export function adminCreate(state: AdminCreateState, action: AdminCreateActions): AdminCreateState {
    switch (action.type) {
        case "add-position":
            return [...state, {id: "", displayName: "", candidates: [{key: "", name: ""}]}];
        case "delete-position":
            return state.filter((_, i) => i !== action.payload.positionIndex);
        case "set-position":
            return state.map((pos, i) => i !== action.payload.positionIndex ? pos :
                {...pos, id: slugify(action.payload.value), displayName: action.payload.value});
        case "add-candidate":
            return state.map((pos, i) => i !== action.payload.positionIndex ? pos :
                {...pos, candidates: [...pos.candidates, {key: "", name: ""}]});
        case "delete-candidate":
            return state.map((pos, i) => i !== action.payload.positionIndex ? pos :
                {...pos,
                    candidates: pos.candidates.filter((_, j) => j !== action.payload.candidateIndex),
                });
        case "set-candidate":
            return state.map((pos, i) => i !== action.payload.positionIndex ? pos :
                {...pos,
                    candidates: pos.candidates.map((candidate, j) => j !== action.payload.candidateIndex ? candidate :
                    {...candidate, id: slugify(action.payload.value), name: action.payload.value}),
                });
    }
    return state;
}