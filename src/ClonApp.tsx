import { FeedProvider } from "./feed/contexts/FeedProvider";
import { FeedPage } from "./feed/pages/FeedPage";
import { UserTweetsProvider } from "./userTweets/contexts/UserTweetsProvider";
import { UserTweetsPage } from "./userTweets/pages/UserTweetsPage";
import { FollowersProvider } from "./followers/contexts/FollowersProvider";
import { FollowersPage } from "./followers/pages/FollowersPage";
import { FollowingProvider } from "./following/contexts/FollowingProvider";
import { FollowingPage } from "./following/pages/FollowingPage";
import { TweetProvider } from "./tweets/contexts/TweetProvider";
import { PublishTweetPage } from "./tweets/pages/PublishTweetPage";
import { NavBar } from "./ui/components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeProvider } from "./home/contexts/HomeProvider";
import { HomePage } from "./home/pages/HomePage";



export const ClonApp = () => (
    <HomeProvider>
    <TweetProvider>
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tweet" element={<PublishTweetPage />} />
            <Route path="/feed" element={<FeedProvider><FeedPage /></FeedProvider>} />
            <Route path="/seguidos" element={<FollowingProvider><FollowingPage /></FollowingProvider>} />
            <Route path="/seguidores" element={<FollowersProvider><FollowersPage /></FollowersProvider>} />
            <Route path="/usuarios/:userId/tweets" element={<UserTweetsProvider><UserTweetsPage /></UserTweetsProvider>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </TweetProvider>
    </HomeProvider>
);





