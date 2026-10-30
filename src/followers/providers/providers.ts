import { followers } from "../data/followers";
import { followedUsers } from "../../following/data/followedUsers";
import type { Follower, FollowResult } from "../types/FollowerInterfaces";

export const getFollowers = async (): Promise<Follower[]> => {
    return followers.map(user => ({
        uid: user.uid,
        username: user.username,
        isFollowing: followedUsers.some(followed => followed.uid === user.uid),
    })).sort((a, b) => a.username.localeCompare(b.username, "es"));
};

export const followUserById = async (uid: string): Promise<FollowResult> => {
    const user = followers.find(follower => follower.uid === uid);
    if (!user) return { ok: false, errorMessage: "No se encontró el usuario." };
    if (!followedUsers.some(followed => followed.uid === uid)) {
        followedUsers.push({ uid: user.uid, username: user.username });
    }
    return { ok: true, errorMessage: null };
};
