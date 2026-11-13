import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { FireBaseDB } from "../../firebase/config";
import type { FeedTweet } from "../types/FeedInterfaces";

export const getFeedTweets = (
    onLoad: (tweets: FeedTweet[]) => void,
    onError: (error: Error) => void,
) => {
    const tweetsQuery = query(collection(FireBaseDB, "tweets"), orderBy("createdAt", "desc"));

    return onSnapshot(tweetsQuery, snapshot => {
        try {
            const tweets = snapshot.docs.map(document => {
                const data = document.data();
                if (!(data.createdAt instanceof Timestamp) || !data.userId?.uid) {
                    throw new Error("Una publicación tiene datos incompletos.");
                }
                return {
                    id: document.id,
                    userId: data.userId,
                    username: data.userId.username || "Usuario",
                    message: data.message,
                    createdAt: data.createdAt.toDate(),
                    ...(data.attachment ? { attachment: data.attachment } : {}),
                } as FeedTweet;
            });
            onLoad(tweets);
        } catch (error) {
            onError(error instanceof Error ? error : new Error("No se pudo leer el feed."));
        }
    }, onError);
};
