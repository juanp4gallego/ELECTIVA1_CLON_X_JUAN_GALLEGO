import { useContext, useState } from "react";
import { FollowersContext } from "../contexts/FollowersContext";

export const FollowersPage = () => {
    const { followersState, followUser } = useContext(FollowersContext);
    const [page, setPage] = useState(1);
    const [followingUid, setFollowingUid] = useState<string | null>(null);
    const { users, loading, errorMessage } = followersState;
    const totalPages = Math.max(1, Math.ceil(users.length / 10));
    const currentPage = Math.min(page, totalPages);
    const visibleUsers = users.slice((currentPage - 1) * 10, currentPage * 10);

    const onFollow = async (uid: string) => {
        if (followingUid) return;
        setFollowingUid(uid);
        try { await followUser(uid); }
        finally { setFollowingUid(null); }
    };

    return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="h3 mb-4">Seguidores</h1>
                    {loading && <p role="status">Cargando seguidores...</p>}
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {!loading && (
                        <>
                            <div className="card">
                                <div className="card-header">Seguidores: {users.length}</div>
                                <ul className="list-group list-group-flush">
                                    {visibleUsers.map(user => (
                                        <li key={user.uid} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                            <span className="fw-semibold">{user.username}</span>
                                            {user.isFollowing ? (
                                                <span className="small" role="status">Siguiendo</span>
                                            ) : (
                                                <button type="button" className="btn theme-primary btn-sm"
                                                    disabled={followingUid !== null} onClick={() => onFollow(user.uid)}>
                                                    {followingUid === user.uid ? "Siguiendo..." : "Seguir"}
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {users.length === 0 && <div className="card-body">Todavía no tienes seguidores.</div>}
                            </div>
                            {users.length > 0 && (
                                <nav className="mt-3" aria-label="Páginas de seguidores">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <button className="page-link" disabled={currentPage === 1}
                                                onClick={() => setPage(currentPage - 1)}>Anterior</button>
                                        </li>
                                        <li className="page-item">
                                            <span className="page-link" aria-current="page">Página {currentPage} de {totalPages}</span>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link" disabled={currentPage === totalPages}
                                                onClick={() => setPage(currentPage + 1)}>Siguiente</button>
                                        </li>
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
