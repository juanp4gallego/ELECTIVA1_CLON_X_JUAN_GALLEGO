import { useContext, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { TweetContext } from "../../tweets/contexts/TweetContext";
import type { AuthState } from "../../auth/types/AuthReducerInterfaces";
import type { TweetState } from "../../tweets/types/TweetInterfaces";
import type { FeedState } from "../types/FeedInterfaces";
import { getFeedTweets } from "../providers/providers";
import { FeedContext } from "./FeedContext";

const initialState: FeedState = { tweets: [], loading: true, errorMessage: null };

interface FeedProviderProps {
    children: ReactNode;
}

export const FeedProvider = ({ children }: FeedProviderProps) => {
    const { authState } = useContext(AuthContext) as { authState: AuthState };
    const { tweetState } = useContext(TweetContext) as { tweetState: TweetState };
    const [feedState, setFeedState] = useState(initialState);
    const uid = authState.user?.uid ?? "";
    const username = authState.user?.username || authState.user?.email || "Usuario";

    useEffect(() => {
        let active = true;
        const loadFeed = async () => {
            try {
                const tweets = await getFeedTweets(uid, username, tweetState.tweets);
                if (active) setFeedState({ tweets, loading: false, errorMessage: null });
            } catch {
                if (active) setFeedState({ tweets: [], loading: false, errorMessage: "No se pudo cargar el feed." });
            }
        };
        void loadFeed();
        return () => { active = false; };
    }, [uid, username, tweetState.tweets]);

    return <FeedContext.Provider value={feedState}>{children}</FeedContext.Provider>;
};
