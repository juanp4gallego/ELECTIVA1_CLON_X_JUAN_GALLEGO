import type { User } from "../../auth/types/AuthReducerInterfaces";
import type { TweetAttachment } from "../../tweets/types/TweetInterfaces";
export interface FeedTweet {
    id: string;
    userId: User;
    username: string;
    message: string;
    createdAt: Date;
    attachment?: TweetAttachment;
}
export interface FeedState {
    tweets: FeedTweet[];
    loading: boolean;
    errorMessage: string | null;
}

