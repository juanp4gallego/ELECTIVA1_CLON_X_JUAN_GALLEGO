import { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeContext } from "../contexts/HomeContext";
import { AuthContext } from "../../auth/contexts/AuthContext";

export const HomePage = () => {

    const { stats, loading, errorMessage } = useContext(HomeContext);
    const { authState } = useContext(AuthContext);

    // if (!context) throw new Error("HomePage requiere HomeProvider");
    const name = authState.user?.username || authState.user?.email || "Usuario";

    return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="h3 mb-4">Inicio</h1>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="h5 card-title">Hola, {name}</h2>
                            <p className="card-text">¿Quieres compartir algo con tus seguidores?</p>
                            <Link to="/tweet" className="btn theme-primary">Tweet</Link>
                        </div>
                    </div>

                    {loading && <p role="status">Cargando contadores...</p>}
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                    {stats && (
                        <div className="row g-3">
                            <div className="col-12 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h2 className="h6 card-title">Seguidores</h2>
                                        <p className="fs-3 mb-3">{stats.followers}</p>
                                        <Link to="/seguidores" className="card-link">Ver seguidores</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h2 className="h6 card-title">Seguidos</h2>
                                        <p className="fs-3 mb-3">{stats.following}</p>
                                        <Link to="/seguidos" className="card-link">Ver seguidos</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
