export interface Follower {
    uid: string;
    username: string;
    isFollowing: boolean;
}
export interface FollowersState {
    users: Follower[];
    loading: boolean;
    errorMessage: string | null;
}

export interface FollowResult {
    ok: boolean;
    errorMessage: string | null;
}
