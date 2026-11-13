import { useContext, useEffect, useReducer, type ReactNode } from "react";
import { FollowingContext } from "./FollowingContext";
import { FollowingReducer } from "../reducers/FollowingReducer";
import { ACCION_TYPES } from "../reducers/actionTypes";
import { FollowersContext } from "../../followers/contexts/FollowersContext";
import type { FollowingState } from "../types/FollowingInterfaces";

const initialState: FollowingState = { users: [], loading: true, errorMessage: null };

export const FollowingProvider = ({ children }: { children: ReactNode }) => {
    const { followersState } = useContext(FollowersContext);
    const [followingState, dispatch] = useReducer(FollowingReducer, initialState);
    useEffect(() => {
        dispatch({ type: ACCION_TYPES.load, payload: {
            users: followersState.following,
            loading: followersState.loading,
            errorMessage: followersState.errorMessage,
        } });
    }, [followersState]);
    return <FollowingContext.Provider value={followingState}>{children}</FollowingContext.Provider>;
};
