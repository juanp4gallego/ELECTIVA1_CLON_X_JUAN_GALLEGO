import { feedTweets } from "../data/feedTweets";
import { userTweets } from "../../userTweets/data/userTweets";
import { followedUsers } from "../../following/data/followedUsers";
import type { Tweet } from "../../tweets/types/TweetInterfaces";
import type { FeedTweet } from "../types/FeedInterfaces";

export const getFeedTweets = async (userId: string, username: string, publishedTweets: Tweet[]): Promise<FeedTweet[]> => {
    const allTweets = [...feedTweets, ...userTweets, ...publishedTweets];
    const visibleTweets = allTweets.filter(tweet =>
        tweet.userId === userId || followedUsers.some(user => user.uid === tweet.userId)
    );

    const tweets = visibleTweets.map(tweet => ({
        ...tweet,
        username: tweet.userId === userId
            ? username
            : followedUsers.find(user => user.uid === tweet.userId)?.username ?? "Usuario",
    }));

    return tweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
