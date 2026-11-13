import type { User } from "../../auth/types/AuthReducerInterfaces";
export interface Follower {
    uid: string;
    username: string;
    isFollowing: boolean;
    email?: string;
    photoURL?: string;
}
export interface FollowersState {
    recommendations: User[];
    following: User[];
    users: Follower[];
    loading: boolean;
    errorMessage: string | null;
}

export interface FollowResult {
    ok: boolean;
    errorMessage: string | null;
}

export interface FollowersContextValue {
    followersState: FollowersState;
    followUser: (uid: string) => Promise<boolean>;
    unfollowUser: (uid: string) => Promise<boolean>;
}


