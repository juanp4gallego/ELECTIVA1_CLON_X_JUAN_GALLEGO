import { collection, doc, getDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { FireBaseDB } from "../../firebase/config";
import type { Tweet } from "../../tweets/types/TweetInterfaces";


import { getFollowCounts, followUser as saveFollow } from "../../social/providers/providers";
import type { UserProfile } from "../types/UserTweetsInterfaces";

export const getUserProfile = async (uid: string, currentUid: string, currentName: string): Promise<UserProfile | null> => {
    const isOwnProfile = uid === currentUid;
    const result = await getDoc(doc(FireBaseDB, "users", uid));
    if (!isOwnProfile && !result.exists()) return null;
    const data = result.data();
    const counts = await getFollowCounts(uid);
    const following = await getDoc(doc(FireBaseDB, "follows", currentUid + "_" + uid));
    return {
        uid,
        username: isOwnProfile ? currentName : (data?.username || data?.fullName || "Usuario"),
        followers: counts.followers,
        following: counts.following,
        isFollowing: following.exists(),
        isOwnProfile,
    };
};
export const getUserTweets = async (uid: string): Promise<Tweet[]> => {
    if (!uid) return [];
    const tweetsQuery = query(
        collection(FireBaseDB, "tweets"),
        where("userId.uid", "==", uid),
    );
    const result = await getDocs(tweetsQuery);
    const tweets = result.docs.map(document => {
        const data = document.data();
        if (!(data.createdAt instanceof Timestamp)) {
            throw new Error("INVALID_TWEET_DATE");
        }
        return {
            id: document.id,
            userId: data.userId,
            message: data.message,
            createdAt: data.createdAt.toDate(),
            ...(data.attachment ? { attachment: data.attachment } : {}),
        } as Tweet;
    });
    return tweets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const followProfile = async (profile: UserProfile): Promise<boolean> => {
    if (profile.isOwnProfile) return false;
    await saveFollow({ uid: profile.uid, username: profile.username, email: "", photoURL: "" });
    return true;
};
