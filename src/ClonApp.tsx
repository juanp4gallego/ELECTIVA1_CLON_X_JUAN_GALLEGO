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

const PendingPage = ({ title }: { title: string }) => (
    <div className="container mt-4">
        <h2>{title}</h2>
        <p>Esta página está pendiente de desarrollar.</p>
    </div>
);

export const ClonApp = () => (
    <HomeProvider>
    <TweetProvider>
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tweet" element={<PublishTweetPage />} />
            <Route path="/feed" element={<PendingPage title="Feed" />} />
            <Route path="/seguidos" element={<FollowingProvider><FollowingPage /></FollowingProvider>} />
            <Route path="/seguidores" element={<FollowersProvider><FollowersPage /></FollowersProvider>} />
            <Route path="/usuarios/:userId/tweets" element={<PendingPage title="Tweets del usuario" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </TweetProvider>
    </HomeProvider>
);



