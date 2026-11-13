import type { User } from "../../auth/types/AuthReducerInterfaces";
import { createContext } from "react";
import type { TweetAttachment, TweetState } from "../types/TweetInterfaces";
interface TweetContextValue {
    tweetState: TweetState;
    publishTweet: (message: string, userId: User, attachment?: TweetAttachment) => Promise<boolean>;
    clearMessage: () => void;
}
export const TweetContext = createContext<TweetContextValue>({} as TweetContextValue);
