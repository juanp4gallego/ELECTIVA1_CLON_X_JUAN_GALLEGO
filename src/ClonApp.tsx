import "./ui/Interact.css";
import { useContext } from "react";
import { AuthContext } from "./auth/contexts/AuthContext";
import { FollowersProvider } from "./followers/contexts/FollowersProvider";
import { TweetProvider } from "./tweets/contexts/TweetProvider";
import { HomeProvider } from "./home/contexts/HomeProvider";
import { NavBar } from "./ui/components/NavBar";
import { BaseRouter } from "./routes/BaseRouter";

export const ClonApp = () => {
    const { authState, checkingSession } = useContext(AuthContext);

    if (checkingSession || !authState.logged) {
        return <BaseRouter />;
    }

    return (
        <HomeProvider>
            <TweetProvider>
                <FollowersProvider>
                    <div className="interact-app">
                        <NavBar />
                        <div className="interact-main">
                            <BaseRouter />
                        </div>
                    </div>
                </FollowersProvider>
            </TweetProvider>
        </HomeProvider>
    );
};
