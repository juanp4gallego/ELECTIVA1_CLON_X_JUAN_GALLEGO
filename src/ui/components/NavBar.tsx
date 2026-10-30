import { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../auth/contexts/AuthContext"

export const NavBar = () => {
    const { authState, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogoutButton = async () => {
        if (await logout()) navigate("/login", { replace: true });
    };


    return (
        <nav className="navbar bg-1 fg-2 border-bottom shadow-sm py-3" aria-label="Navegación principal">
            <div className="container-fluid d-flex align-items-center gap-3 flex-wrap">
                <Link to="/" className="navbar-brand fw-bold">Clon X</Link>
                <ul className="navbar-nav d-flex flex-row flex-wrap align-items-center gap-3">
                    <li className="nav-item"><NavLink to="/" end className="nav-link">Inicio</NavLink></li>
                    <li className="nav-item"><NavLink to="/feed" className="nav-link">Feed</NavLink></li>
                    <li className="nav-item"><NavLink to="/seguidos" className="nav-link">Seguidos</NavLink></li>
                    <li className="nav-item"><NavLink to="/seguidores" className="nav-link">Seguidores</NavLink></li>
                    <li className="nav-item"><NavLink to={`/usuarios/${authState.user?.uid}/tweets`} className="nav-link">Mis tweets</NavLink></li>
                    <li className="nav-item">
                        <Link to="/tweet" className="btn theme-primary rounded-pill px-4">Tweet</Link>
                    </li>
                </ul>
                <div className="d-flex align-items-center gap-3" style={{ marginInlineStart: "auto" }}>
                    {authState.logged ? (
                        <>
                            <span className="fw-semibold">{authState.user?.username || authState.user?.email}</span>
                            <button className="btn-outline theme-danger rounded-pill px-3" type="button" onClick={onLogoutButton}>Salir</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-outline theme-primary rounded-pill px-3">Ingresar</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

