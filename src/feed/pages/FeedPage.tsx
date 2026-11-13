import { Pagination } from "../../ui/components/Pagination";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FeedContext } from "../contexts/FeedContext";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { FollowersContext } from "../../followers/contexts/FollowersContext";
import { PostComposer } from "../../tweets/components/PostComposer";
import { PostAttachment } from "../../tweets/components/PostAttachment";
import type { FeedState } from "../types/FeedInterfaces";

export const FeedPage = () => {
    const { tweets, loading, errorMessage } = useContext(FeedContext) as FeedState;
    const { authState } = useContext(AuthContext);
    const { followersState } = useContext(FollowersContext);
    const [tab, setTab] = useState("forYou");
    const [page, setPage] = useState(1);
    const filtered = tab === "following" ? tweets.filter(tweet => followersState.following.some(user => user.uid === tweet.userId.uid)) : tweets;
    const listLoading = loading || (tab === "following" && followersState.loading);
    const listError = errorMessage || (tab === "following" ? followersState.errorMessage : null);
    const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
    const currentPage = Math.min(page, totalPages);
    const visibleTweets = filtered.slice((currentPage - 1) * 10, currentPage * 10);
    return (
        <main>
            <div className="feed-tabs d-flex" role="tablist" aria-label="Publicaciones">
                <button role="tab" aria-selected={tab === "forYou"} className={tab === "forYou" ? "active" : ""}
                    onClick={() => { setTab("forYou"); setPage(1); }}>Para ti</button>
                <button role="tab" aria-selected={tab === "following"} className={tab === "following" ? "active" : ""}
                    onClick={() => { setTab("following"); setPage(1); }}>Siguiendo</button>
            </div>
            <div className="p-3">
                <PostComposer />
                {listLoading && <p role="status">Cargando publicaciones...</p>}
                {listError && <p role="alert">{listError}</p>}
                {!listLoading && !listError && visibleTweets.map(tweet => {
                    const own = tweet.userId.uid === authState.user?.uid;
                    const photo = own ? authState.user?.photoURL : tweet.userId.photoURL;
                    return (
                        <article key={tweet.id} className="card post-card mb-2">
                            <div className="card-body d-flex gap-3">
                                {photo ? <img className="post-avatar" src={photo} alt="" referrerPolicy="no-referrer" /> :
                                    <span className="post-avatar" aria-hidden="true">{tweet.username.charAt(0).toUpperCase()}</span>}
                                <div className="post-body">
                                    <div className="d-flex flex-wrap gap-1 align-items-baseline">
                                        <Link to={`/usuarios/${tweet.userId.uid}/tweets`} className="post-name">{tweet.username}</Link>
                                        <span className="small post-muted">@{tweet.username.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "") || "usuario"}</span>
                                        <time className="small post-muted" dateTime={tweet.createdAt.toISOString()}>· {tweet.createdAt.toLocaleString("es-CO", { timeZone: "America/Bogota", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</time>
                                    </div>
                                    <p className="mb-0 text-break post-text">{tweet.message}</p>
                                    <PostAttachment attachment={tweet.attachment} />
                                </div>
                            </div>
                        </article>
                    );
                })}
                {!listLoading && !listError && filtered.length === 0 && <p>{tab === "following" && followersState.following.length === 0 ? "Todavía no sigues a nadie." : "No hay publicaciones para mostrar."}</p>}
                {!listLoading && !listError && <Pagination page={currentPage} total={filtered.length} onChange={setPage} />}
            </div>
        </main>
    );
};



