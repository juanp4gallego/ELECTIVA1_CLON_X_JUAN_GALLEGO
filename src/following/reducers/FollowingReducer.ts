import type { FollowingState } from "../types/FollowingInterfaces";
import type { FollowingReducerAction } from "../types/FollowingReducerInterfaces";
import { ACCION_TYPES } from "./actionTypes";

export const FollowingReducer = (state: FollowingState, action: FollowingReducerAction): FollowingState => {
    switch (action.type) {
        case ACCION_TYPES.error:
            return { ...state, ...action.payload };
        case ACCION_TYPES.load:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
