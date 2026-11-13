import type { TweetState, Tweet } from "./TweetInterfaces";
export interface TweetReducerAction {
    type: "load" | "error" | "publish" | "clear";
    payload: Partial<TweetState> & {
    tweet?: Tweet;
    };
}
