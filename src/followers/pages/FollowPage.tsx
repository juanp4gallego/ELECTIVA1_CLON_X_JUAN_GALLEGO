import { useContext } from "react";
import { FollowersContext } from "../contexts/FollowersContext";
import { UserList } from "../../ui/components/UserList";

export const FollowPage = () => {
    const { followersState } = useContext(FollowersContext);
    const users = followersState.recommendations.map(user => ({ ...user, isFollowing: false }));
    return <UserList title="Usuarios para seguir" users={users}
        loading={followersState.loading} errorMessage={followersState.errorMessage} />;
};
