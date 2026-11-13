import type { UserTweetsState } from "../types/UserTweetsInterfaces";
import type { UserTweetsReducerAction } from "../types/UserTweetsReducerInterfaces";
import { ACCION_TYPES } from "./actionTypes";

export const UserTweetsReducer = (state: UserTweetsState, action: UserTweetsReducerAction): UserTweetsState => {
    switch (action.type) {
        case ACCION_TYPES.follow:
            return { ...state, profile: state.profile ? { ...state.profile, isFollowing: true, followers: state.profile.followers + 1 } : null, errorMessage: null };
        case ACCION_TYPES.error:
            return { ...state, ...action.payload };
        case ACCION_TYPES.load:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
