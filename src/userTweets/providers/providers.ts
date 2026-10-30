import { followedUsers } from "../../following/data/followedUsers";
import { followers } from "../../followers/data/followers";
import { profileStats, userTweets } from "../data/userTweets";
import type { UserProfile } from "../types/UserTweetsInterfaces";

export const getUserProfile = async (uid: string, currentUid: string, currentName: string): Promise<UserProfile | null> => {
    const isOwnProfile = uid === currentUid;
    const user = followedUsers.find(user => user.uid === uid) || followers.find(user => user.uid === uid);
    if (!isOwnProfile && !user) return null;
    const stats = profileStats.find(item => item.uid === uid);
    return {
        uid,
        username: isOwnProfile ? currentName : user!.username,
        followers: isOwnProfile ? followers.length : (stats?.followers ?? 0),
        following: isOwnProfile ? followedUsers.length : (stats?.following ?? 0),
        isFollowing: followedUsers.some(user => user.uid === uid),
        isOwnProfile,
    };
};

export const getUserTweets = async (uid: string) => {
    return userTweets.filter(tweet => tweet.userId === uid);
};

export const followProfile = async (profile: UserProfile): Promise<boolean> => {
    if (profile.isOwnProfile) return false;
    if (!followedUsers.some(user => user.uid === profile.uid)) {
        followedUsers.push({ uid: profile.uid, username: profile.username });
        const stats = profileStats.find(item => item.uid === profile.uid);
        if (stats) stats.followers += 1;
        else profileStats.push({ uid: profile.uid, followers: profile.followers + 1, following: profile.following });
    }
    return true;
};
