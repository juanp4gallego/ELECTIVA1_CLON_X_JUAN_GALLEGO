export interface Tweet {
    id: string;
    userId: string;
    message: string;
    createdAt: string;
}
export interface TweetState {
    tweets: Tweet[];
    errorMessage: string | null;
    successMessage: string | null;
}
export type TweetResult =
    | { ok: true; tweet: Tweet }
    | { ok: false; errorMessage: string };
