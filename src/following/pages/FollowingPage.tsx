import { useContext, useState } from "react";
import { FollowingContext } from "../contexts/FollowingContext";

export const FollowingPage = () => {
    const  { users, loading, errorMessage } = useContext(FollowingContext);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visibleUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="h3 mb-4">Usuarios seguidos</h1>
                    {loading && <p role="status">Cargando usuarios...</p>}
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {!loading && !errorMessage && (
                        <>
                            <div className="card">
                                <div className="card-header">Seguidos: {users.length}</div>
                                <ul className="list-group list-group-flush">
                                    {visibleUsers.map(user => (
                                        <li key={user.uid} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                            <span className="fw-semibold">{user.username}</span>

                                        </li>
                                    ))}
                                </ul>
                                {users.length === 0 && <div className="card-body">Todavía no sigues a ningún usuario.</div>}
                            </div>
                            {users.length > 0 && (
                                <nav className="mt-3" aria-label="Páginas de usuarios seguidos">
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

