export interface FollowedUser {
    uid: string;
    username: string;
}
export interface FollowingState {
    users: FollowedUser[];
    loading: boolean;
    errorMessage: string | null;
}
export type FollowingResult =
    | { ok: true; users: FollowedUser[] }
    | { ok: false; errorMessage: string };


