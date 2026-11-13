import type { FeedState } from "./FeedInterfaces";
export interface FeedReducerAction {
    type: "load" | "error";
    payload: Partial<FeedState> & {
    };
}
