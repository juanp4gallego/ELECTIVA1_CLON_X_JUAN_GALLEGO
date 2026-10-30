import { useContext, useState } from "react";
import { UserTweetsContext } from "../contexts/UserTweetsContext";

export const UserTweetsPage = () => {
    const { userTweetsState, followUser } = useContext(UserTweetsContext);
    const [page, setPage] = useState(1);
    const [following, setFollowing] = useState(false);
    const { profile, tweets, loading, errorMessage } = userTweetsState;
    const totalPages = Math.max(1, Math.ceil(tweets.length / 10));
    const currentPage = Math.min(page, totalPages);
    const visibleTweets = tweets.slice((currentPage - 1) * 10, currentPage * 10);

    const onFollow = async () => {
        if (following) return;
        setFollowing(true);
        try { await followUser(); }
        finally { setFollowing(false); }
    };

    return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="h3 mb-4">Tweets del usuario</h1>
                    {loading && <p role="status">Cargando usuario...</p>}
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {profile && (
                        <>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h2 className="h5">{profile.username}</h2>
                                    <p>Seguidores: {profile.followers} · Seguidos: {profile.following}</p>
                                    {!profile.isOwnProfile && !profile.isFollowing && (
                                        <button className="btn theme-primary" disabled={following} onClick={onFollow}>
                                            {following ? "Siguiendo..." : "Seguir"}
                                        </button>
                                    )}
                                    {!profile.isOwnProfile && profile.isFollowing && <span>Siguiendo</span>}
                                </div>
                            </div>
                            {tweets.length === 0 && <p>Este usuario todavía no ha publicado tweets.</p>}
                            {visibleTweets.map(tweet => (
                                <article key={tweet.id} className="card mb-3">
                                    <div className="card-body">
                                        <time className="small" dateTime={tweet.createdAt}>{new Date(tweet.createdAt).toLocaleString("es-CO")}</time>
                                        <p className="card-text mt-2 text-break">{tweet.message}</p>
                                    </div>
                                </article>
                            ))}
                            {tweets.length > 0 && (
                                <nav aria-label="Páginas de tweets">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><button className="page-link" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Anterior</button></li>
                                        <li className="page-item"><span className="page-link" aria-current="page">Página {currentPage} de {totalPages}</span></li>
                                        <li className="page-item"><button className="page-link" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Siguiente</button></li>
                                    </ul>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};
