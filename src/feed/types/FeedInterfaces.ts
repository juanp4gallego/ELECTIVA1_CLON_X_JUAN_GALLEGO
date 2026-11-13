import type { TweetAttachment } from "../../tweets/types/TweetInterfaces";
export interface FeedTweet {
    id: string;
    userId: string;
    username: string;
    message: string;
    createdAt: string;
    attachment?: TweetAttachment;
}
export interface FeedState {
    tweets: FeedTweet[];
    loading: boolean;
    errorMessage: string | null;
}

