import { followedUsers } from "../data/followedUsers";
import type { FollowingResult } from "../types/FollowingInterfaces";

export const getFollowedUsers = async (): Promise<FollowingResult> => {
    const users = [...followedUsers].sort((a, b) => a.username.localeCompare(b.username, "es"));
    return { ok: true, users };
};

