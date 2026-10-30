import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FeedContext } from "../contexts/FeedContext";

export const FeedPage = () => {
    const { tweets, loading, errorMessage } = useContext(FeedContext);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(tweets.length / 10));
    const currentPage = Math.min(page, totalPages);
    const visibleTweets = tweets.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="h3 mb-4">Feed</h1>
                    {loading && <p role="status">Cargando publicaciones...</p>}
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {!loading && !errorMessage && (
                        <>
                            {tweets.length === 0 && <p>Todavía no hay publicaciones para mostrar.</p>}
                            {visibleTweets.map(tweet => (
                                <article key={tweet.id} className="card mb-3">
                                    <div className="card-body">
                                        <Link to={`/usuarios/${tweet.userId}/tweets`} className="fw-semibold">{tweet.username}</Link>
                                        <p className="small mb-2">
                                            <time dateTime={tweet.createdAt}>{new Date(tweet.createdAt).toLocaleString("es-CO")}</time>
                                        </p>
                                        <p className="card-text text-break">{tweet.message}</p>
                                    </div>
                                </article>
                            ))}
                            {tweets.length > 0 && (
                                <nav aria-label="Páginas del feed">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <button className="page-link" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Anterior</button>
                                        </li>
                                        <li className="page-item">
                                            <span className="page-link" aria-current="page">Página {currentPage} de {totalPages}</span>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Siguiente</button>
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
