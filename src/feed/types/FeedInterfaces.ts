export interface FeedTweet {
    id: string;
    userId: string;
    username: string;
    message: string;
    createdAt: string;
}
export interface FeedState {
    tweets: FeedTweet[];
    loading: boolean;
    errorMessage: string | null;
}
