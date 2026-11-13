import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserTweetsContext } from "../contexts/UserTweetsContext";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { PostAttachment } from "../../tweets/components/PostAttachment";
import type { UserTweetsState } from "../types/UserTweetsInterfaces";

export const UserTweetsPage = () => {
    const { userTweetsState, followUser } = useContext(UserTweetsContext) as {
        userTweetsState: UserTweetsState;
        followUser: () => Promise<boolean>;
    };
    const { authState } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [following, setFollowing] = useState(false);
    const { profile, tweets, loading, errorMessage } = userTweetsState;
    const totalPages = Math.max(1, Math.ceil(tweets.length / 10));
    const currentPage = Math.min(page, totalPages);
    const visibleTweets = tweets.slice((currentPage - 1) * 10, currentPage * 10);
    const photo = profile?.isOwnProfile ? authState.user?.photoURL : "";
    const handle = profile?.username.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "") || "usuario";

    const onFollow = async () => {
        if (following) return;
        setFollowing(true);
        try { await followUser(); } finally { setFollowing(false); }
    };

    return (
        <main>
            <header className="profile-page-heading"><h1 className="h6 mb-0">{profile?.isOwnProfile ? "Mi Perfil" : "Perfil"}</h1></header>
            <div className="p-3">
                {loading && <p role="status">Cargando usuario...</p>}
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                {profile && (
                    <>
                        <section className="card profile-card mb-4" aria-label="Información del perfil">
                            <div className="profile-cover" />
                            <div className="profile-details">
                                {photo ? <img src={photo} alt="" referrerPolicy="no-referrer" className="profile-avatar" /> :
                                    <span className="profile-avatar" aria-hidden="true">{profile.username.charAt(0).toUpperCase()}</span>}
                                <div className="profile-identity">
                                    <h2 className="h5 mb-1">{profile.username}</h2>
                                    <p className="post-muted small mb-0">@{handle}</p>
                                </div>
                                {!profile.isOwnProfile && !profile.isFollowing &&
                                    <button className="btn interact-button rounded-pill mt-3" disabled={following} onClick={onFollow}>{following ? "Siguiendo..." : "Seguir"}</button>}
                                {!profile.isOwnProfile && profile.isFollowing && <p className="small mt-3 mb-0">Siguiendo</p>}
                            </div>
                            <div className="profile-stats">
                                <Link to="/follow"><span className="profile-stat-icon" aria-hidden="true">♧</span><span>Siguiendo<strong>{profile.following.toLocaleString("es-CO")}</strong></span></Link>
                                <Link to="/seguidores"><span className="profile-stat-icon" aria-hidden="true">♧</span><span>Seguidores<strong>{profile.followers.toLocaleString("es-CO")}</strong></span></Link>
                                <div><span className="profile-stat-icon" aria-hidden="true">☷</span><span>Twits públicos<strong>{tweets.length}</strong></span></div>
                            </div>
                        </section>
                        <h2 className="h6 mb-3">{profile.isOwnProfile ? "Tus Twits Públicos" : "Twits Públicos"}</h2>
                        {tweets.length === 0 && <p className="post-muted">Todavía no hay publicaciones.</p>}
                        {visibleTweets.map(tweet => (
                            <article key={tweet.id} className="card post-card mb-2">
                                <div className="card-body">
                                    {photo ? <img src={photo} alt="" referrerPolicy="no-referrer" className="post-avatar" /> :
                                        <span className="post-avatar" aria-hidden="true">{profile.username.charAt(0).toUpperCase()}</span>}
                                    <div className="post-body">
                                        <div className="d-flex flex-wrap gap-1 align-items-baseline">
                                            <span className="post-name">{profile.username}</span>
                                            <span className="small post-muted">@{handle}</span>
                                            <time className="small post-muted" dateTime={tweet.createdAt}>· {new Date(tweet.createdAt).toLocaleDateString("es-CO")}</time>
                                        </div>
                                        <p className="mb-0 text-break post-text">{tweet.message}</p>
                                        <PostAttachment attachment={tweet.attachment} />
                                    </div>
                                </div>
                            </article>
                        ))}
                        {tweets.length > 0 && <nav className="d-flex justify-content-center gap-3 mt-4" aria-label="Páginas de tweets">
                            <button className="btn post-secondary" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Anterior</button>
                            <span className="small align-self-center">{currentPage} / {totalPages}</span>
                            <button className="btn post-secondary" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Siguiente</button>
                        </nav>}
                    </>
                )}
            </div>
        </main>
    );
};
