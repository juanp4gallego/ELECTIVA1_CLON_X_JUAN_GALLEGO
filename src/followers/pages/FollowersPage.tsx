import { useContext } from "react";
import { FollowersContext } from "../contexts/FollowersContext";
import { UserList } from "../../ui/components/UserList";

export const FollowersPage = () => {
    const { followersState } = useContext(FollowersContext);
    return <UserList title="Mis seguidores" users={followersState.users}
        loading={followersState.loading} errorMessage={followersState.errorMessage} />;
};
