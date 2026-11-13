import { FollowersContext } from "../../followers/contexts/FollowersContext";
import { FirebaseError } from "firebase/app";
import { UserTweetsReducer } from "../reducers/UserTweetsReducer";
import { ACCION_TYPES } from "../reducers/actionTypes";
import { useContext, useEffect, useReducer, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { TweetContext } from "../../tweets/contexts/TweetContext";
import type { AuthState } from "../../auth/types/AuthReducerInterfaces";
import type { TweetState } from "../../tweets/types/TweetInterfaces";
import { UserTweetsContext } from "./UserTweetsContext";
import { getUserProfile, getUserTweets, followProfile } from "../providers/providers";
import type { UserTweetsState } from "../types/UserTweetsInterfaces";

const initialState: UserTweetsState = {
        profile: null, tweets: [], loading: true, errorMessage: null,
    };

export const UserTweetsProvider = ({ children }: { children: ReactNode }) => {
    const { followersState } = useContext(FollowersContext);
    const { userId = "" } = useParams();
    const { authState } = useContext(AuthContext) as { authState: AuthState };
    const { tweetState } = useContext(TweetContext) as { tweetState: TweetState };
    const [state, dispatch] = useReducer(UserTweetsReducer, initialState);
    const currentUid = authState.user?.uid ?? "";
    const currentName = authState.user?.username || authState.user?.email || "Usuario";

    useEffect(() => {
        let active = true;
        const loadUser = async () => {
            try {
                const profile = await getUserProfile(userId, currentUid, currentName);
                const savedTweets = await getUserTweets(userId);
                if (!active) return;
                if (!profile) {
                    dispatch({ type: ACCION_TYPES.load, payload: { profile: null, tweets: [], loading: false, errorMessage: "Usuario no encontrado." } });
                    return;
                }
                const tweets = savedTweets;
                tweets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                dispatch({ type: ACCION_TYPES.load, payload: { profile, tweets, loading: false, errorMessage: null } });
            } catch (error) {
                const errorMessage = error instanceof FirebaseError && error.code === "permission-denied"
                    ? "No tienes permiso para consultar estos tweets. Revisa las reglas de lectura de Firestore."
                    : "No se pudieron consultar los tweets. Revisa tu conexión e intenta nuevamente.";
                if (active) dispatch({ type: ACCION_TYPES.error, payload: { profile: null, tweets: [], loading: false, errorMessage } });
            }
        };
        void loadUser();
        return () => { active = false; };
    }, [userId, currentUid, currentName, tweetState.tweets, followersState]);

    const followUser = async (): Promise<boolean> => {
        if (!state.profile || state.profile.isFollowing) return false;
        try {
            const ok = await followProfile(state.profile);
            if (ok) dispatch({ type: ACCION_TYPES.follow, payload: {} });
            return ok;
        } catch {
            dispatch({ type: ACCION_TYPES.error, payload: { errorMessage: "No se pudo seguir al usuario." } });
            return false;
        }
    };

    return <UserTweetsContext.Provider value={{ userTweetsState: state, followUser }}>{children}</UserTweetsContext.Provider>;
};


