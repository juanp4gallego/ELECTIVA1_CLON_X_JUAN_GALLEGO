import { FollowPage } from "../followers/pages/FollowPage";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../auth/contexts/AuthContext";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";

import { FeedProvider } from "../feed/contexts/FeedProvider";
import { FeedPage } from "../feed/pages/FeedPage";
import { FollowingProvider } from "../following/contexts/FollowingProvider";
import { FollowingPage } from "../following/pages/FollowingPage";
import { FollowersPage } from "../followers/pages/FollowersPage";
import { UserTweetsProvider } from "../userTweets/contexts/UserTweetsProvider";
import { UserTweetsPage } from "../userTweets/pages/UserTweetsPage";
import { PublishTweetPage } from "../tweets/pages/PublishTweetPage";

export const BaseRouter = () => {
    const { authState, checkingSession } = useContext(AuthContext);

    if (checkingSession) {
        return <p className="container py-4" role="status">Cargando sesión...</p>;
    }

    if (!authState.logged) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (

            <Routes>
                <Route path="/" element={<FeedProvider><FeedPage /></FeedProvider>} />
                <Route path="/feed" element={<FeedProvider><FeedPage /></FeedProvider>} />
                <Route path="/tweet" element={<PublishTweetPage />} />
                <Route path="/follow" element={<FollowPage />} />
                <Route path="/seguidos" element={<FollowingProvider><FollowingPage /></FollowingProvider>} />
                <Route path="/seguidores" element={<FollowersPage />} />
                <Route path="/usuarios/:userId/tweets" element={<UserTweetsProvider><UserTweetsPage /></UserTweetsProvider>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

    );
};


