import { BackButton } from "./BackButton";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FollowersContext } from "../../followers/contexts/FollowersContext";

interface UserListItem {
    uid: string;
    username: string;
    photoURL?: string;
    isFollowing: boolean;
}
interface UserListProps {
    allowUnfollow?: boolean;
    title: string;
    users: UserListItem[];
    loading: boolean;
    errorMessage: string | null;
}

export const UserList = ({ title, users, loading, errorMessage, allowUnfollow = false }: UserListProps) => {
    const { followUser, unfollowUser } = useContext(FollowersContext);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [busy, setBusy] = useState<string | null>(null);
    const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const filtered = users.filter(user => normalize(user.username).includes(normalize(search)))
        .sort((a, b) => a.username.localeCompare(b.username, "es"));
    const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
    const currentPage = Math.min(page, totalPages);
    const visibleUsers = filtered.slice((currentPage - 1) * 10, currentPage * 10);
    const onFollow = async (uid: string) => {
        if (busy) return;
        setBusy(uid);
        try { await followUser(uid); } finally { setBusy(null); }
    };

    const onUnfollow = async (uid: string) => {
        if (busy) return;
        setBusy(uid);
        try { await unfollowUser(uid); } finally { setBusy(null); }
    };

    return (
        <main>
            <header className="profile-page-heading d-flex align-items-center gap-3"><BackButton /><h1 className="h6 mb-0">{title}</h1></header>
            <div className="p-3">
                <div className="people-toolbar">
                    <h2 className="h6 mb-0">{title} ({users.length})</h2>
                    <label className="people-search">
                        <span className="visually-hidden">Buscar por nombre</span>
                        <input className="form-control rounded-pill" type="search" placeholder="Buscar por nombre"
                            value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} />
                    </label>
                </div>
                {loading && <p role="status">Cargando usuarios...</p>}
                {errorMessage && <p role="alert" className="text-danger">{errorMessage}</p>}
                {!loading && !errorMessage && (
                    <>
                        <div className="people-grid">
                            {visibleUsers.map(user => (
                                <article className="card people-card" key={user.uid}>
                                    {user.photoURL ? <img className="post-avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" /> :
                                        <span className="post-avatar" aria-hidden="true">{user.username.charAt(0).toUpperCase()}</span>}
                                    <div className="people-details">
                                        <Link className="post-name" to={`/usuarios/${user.uid}/tweets`}>{user.username}</Link>
                                        <p className="small post-muted mb-0">@{normalize(user.username).replace(/[^a-z0-9]/g, "") || "usuario"}</p>
                                    </div>
                                    {user.isFollowing ? (
                                        allowUnfollow ? <button type="button" className="btn post-secondary rounded-pill btn-sm"
                                            disabled={busy !== null} onClick={() => onUnfollow(user.uid)}>
                                            {busy === user.uid ? "Quitando..." : "Dejar de seguir"}
                                        </button> : <span className="people-following">Siguiendo</span>
                                    ) :
                                        <button className="btn interact-button rounded-pill btn-sm" disabled={busy !== null} onClick={() => onFollow(user.uid)}>
                                            {busy === user.uid ? "Siguiendo..." : "Seguir"}
                                        </button>}
                                </article>
                            ))}
                        </div>
                        {filtered.length === 0 && <p className="post-muted mt-3">{search ? "No se encontraron usuarios." : "No hay usuarios para mostrar."}</p>}
                        {filtered.length > 10 && <nav className="d-flex justify-content-center gap-3 mt-4" aria-label="Páginas de usuarios">
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


