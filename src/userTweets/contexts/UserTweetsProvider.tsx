import { useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { TweetContext } from "../../tweets/contexts/TweetContext";
import type { AuthState } from "../../auth/types/AuthReducerInterfaces";
import type { TweetState } from "../../tweets/types/TweetInterfaces";
import { UserTweetsContext } from "./UserTweetsContext";
import { getUserProfile, getUserTweets, followProfile } from "../providers/providers";
import type { UserTweetsState } from "../types/UserTweetsInterfaces";

export const UserTweetsProvider = ({ children }: { children: ReactNode }) => {
    const { userId = "" } = useParams();
    const { authState } = useContext(AuthContext) as { authState: AuthState };
    const { tweetState } = useContext(TweetContext) as { tweetState: TweetState };
    const [state, setState] = useState<UserTweetsState>({
        profile: null, tweets: [], loading: true, errorMessage: null,
    });
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
                    setState({ profile: null, tweets: [], loading: false, errorMessage: "Usuario no encontrado." });
                    return;
                }
                const tweets = [...savedTweets, ...tweetState.tweets.filter(tweet => tweet.userId === userId)];
                tweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setState({ profile, tweets, loading: false, errorMessage: null });
            } catch {
                if (active) setState({ profile: null, tweets: [], loading: false, errorMessage: "No se pudo cargar el usuario." });
            }
        };
        void loadUser();
        return () => { active = false; };
    }, [userId, currentUid, currentName, tweetState.tweets]);

    const followUser = async (): Promise<boolean> => {
        if (!state.profile || state.profile.isFollowing) return false;
        try {
            const ok = await followProfile(state.profile);
            if (ok) setState(current => ({
                ...current,
                profile: current.profile ? { ...current.profile, isFollowing: true, followers: current.profile.followers + 1 } : null,
                errorMessage: null,
            }));
            return ok;
        } catch {
            setState(current => ({ ...current, errorMessage: "No se pudo seguir al usuario." }));
            return false;
        }
    };

    return <UserTweetsContext.Provider value={{ userTweetsState: state, followUser }}>{children}</UserTweetsContext.Provider>;
};
