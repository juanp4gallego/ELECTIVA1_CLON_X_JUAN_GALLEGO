import type { FollowersState } from "./FollowerInterfaces";
export interface FollowersReducerAction {
    type: "load" | "error" | "follow";
    payload: Partial<FollowersState> & {
    uid?: string;
    };
}
