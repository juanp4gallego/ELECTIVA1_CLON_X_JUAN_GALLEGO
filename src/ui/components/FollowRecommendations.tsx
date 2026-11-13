import { useContext, useState } from "react";
import { FollowersContext } from "../../followers/contexts/FollowersContext";
import type { FollowersContextValue } from "../../followers/types/FollowerInterfaces";

export const FollowRecommendations = () => {
    const { followersState, followUser } = useContext(FollowersContext) as FollowersContextValue;
    const [busy, setBusy] = useState(false);
    const users = followersState.users.filter(user => !user.isFollowing).slice(0, 3);
    const onFollow = async (uid: string) => {
        if (busy) return;
        setBusy(true);
        try { await followUser(uid); } finally { setBusy(false); }
    };
    return (
        <section className="follow-recommendations mt-4" aria-labelledby="recommendations-title">
            <h2 id="recommendations-title" className="h6 mb-3">A quién seguir</h2>
            {followersState.loading && <p className="small">Cargando...</p>}
            {followersState.errorMessage && <p className="small" role="alert">{followersState.errorMessage}</p>}
            {users.map(user => (
                <div className="recommendation-row" key={user.uid}>
                    <span className="recommendation-name">{user.username}</span>
                    <button className="btn btn-sm post-secondary" disabled={busy} onClick={() => onFollow(user.uid)}>Seguir</button>
                </div>
            ))}
            {!followersState.loading && users.length === 0 && <p className="small post-muted">Ya sigues a los usuarios sugeridos.</p>}
        </section>
    );
};
