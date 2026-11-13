import type { Tweet } from "../../tweets/types/TweetInterfaces";
export interface UserProfile {
    uid: string;
    username: string;
    followers: number;
    following: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
}
export interface UserTweetsState {
    profile: UserProfile | null;
    tweets: Tweet[];
    loading: boolean;
    errorMessage: string | null;
}
