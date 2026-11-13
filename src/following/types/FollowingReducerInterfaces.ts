import type { FollowingState } from "./FollowingInterfaces";
export interface FollowingReducerAction {
    type: "load" | "error";
    payload: Partial<FollowingState> & {
    };
}
