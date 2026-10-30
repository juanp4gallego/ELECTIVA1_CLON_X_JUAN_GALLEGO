import { useState, type ReactNode } from "react";
import { TweetContext } from "./TweetContext";
import { publishTweet as publishTweetByMessage } from "../providers/providers";
import type { TweetState } from "../types/TweetInterfaces";

const initialState: TweetState = {
    tweets: [],
    errorMessage: null,
    successMessage: null,
};

interface TweetProviderProps {
    children: ReactNode;
}

export const TweetProvider = ({ children }: TweetProviderProps) => {
    const [tweetState, setTweetState] = useState(initialState);

    const publishTweet = async (message: string, userId: string): Promise<boolean> => {
        try {
            const result = await publishTweetByMessage(message, userId);
            if (result.ok === true) {
                setTweetState(current => ({
                    tweets: [result.tweet, ...current.tweets],
                    errorMessage: null,
                    successMessage: "Tweet publicado correctamente.",
                }));
                return true;
            } else {
                setTweetState(current => ({
                    ...current,
                    errorMessage: result.errorMessage,
                    successMessage: null,
                }));
                return false;
            }
        } catch {
            setTweetState(current => ({
                ...current,
                errorMessage: "No se pudo publicar el tweet.",
                successMessage: null,
            }));
            return false;
        }
    };

    const clearMessage = () => {
        setTweetState(current => ({ ...current, errorMessage: null, successMessage: null }));
    };

    return (
        <TweetContext.Provider value={{ tweetState, publishTweet, clearMessage }}>
            {children}
        </TweetContext.Provider>
    );
};
