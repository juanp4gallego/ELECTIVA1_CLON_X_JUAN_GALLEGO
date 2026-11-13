import type { FollowersState } from "../types/FollowerInterfaces";
import type { FollowersReducerAction } from "../types/FollowersReducerInterfaces";
import { ACCION_TYPES } from "./actionTypes";

export const FollowersReducer = (state: FollowersState, action: FollowersReducerAction): FollowersState => {
    switch (action.type) {
        case ACCION_TYPES.follow:
            return { ...state, users: state.users.map(user => user.uid === action.payload.uid ? { ...user, isFollowing: true } : user), errorMessage: null };
        case ACCION_TYPES.error:
            return { ...state, ...action.payload };
        case ACCION_TYPES.load:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
