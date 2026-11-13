import { useContext } from "react";
import { FollowersContext } from "../../followers/contexts/FollowersContext";
import { UserList } from "../../ui/components/UserList";

export const FollowingPage = () => {
    const { followersState } = useContext(FollowersContext);
    const users = followersState.following.map(user => ({ ...user, isFollowing: true }));
    return <UserList allowUnfollow title="Mis seguidos" users={users}
        loading={followersState.loading} errorMessage={followersState.errorMessage} />;
};

