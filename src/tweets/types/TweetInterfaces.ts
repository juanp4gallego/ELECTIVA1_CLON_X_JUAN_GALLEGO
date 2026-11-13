import type { User } from "../../auth/types/AuthReducerInterfaces";
export interface TweetAttachment { name: string; url: string; type: "image" | "video" | "file"; }
export interface Tweet {
    id: string;
    userId: User;
    message: string;
    createdAt: Date;
    attachment?: TweetAttachment;
}
export interface TweetState {
    tweets: Tweet[];
    errorMessage: string | null;
    successMessage: string | null;
}
export type TweetResult =
    | { ok: true; tweet: Tweet }
    | { ok: false; errorMessage: string };

