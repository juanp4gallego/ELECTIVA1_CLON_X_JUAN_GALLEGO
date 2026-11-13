import type { UserTweetsState } from "./UserTweetsInterfaces";
export interface UserTweetsReducerAction {
    type: "load" | "error" | "follow";
    payload: Partial<UserTweetsState> & {
    };
}
