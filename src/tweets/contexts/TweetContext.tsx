import { createContext } from "react";
import type { TweetAttachment, TweetState } from "../types/TweetInterfaces";
interface TweetContextValue {
    tweetState: TweetState;
    publishTweet: (message: string, userId: string, attachment?: TweetAttachment) => Promise<boolean>;
    clearMessage: () => void;
}
export const TweetContext = createContext<TweetContextValue>({} as TweetContextValue);
