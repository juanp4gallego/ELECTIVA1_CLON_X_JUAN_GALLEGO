import { PostModal } from "./PostModal";
import { FollowRecommendations } from "./FollowRecommendations";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";

export const NavBar = () => {
    const { authState, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPostModal, setShowPostModal] = useState(false);
    const onLogout = async () => { if (await logout()) navigate("/login", { replace: true }); };
    return (
        <aside className="interact-sidebar">
            <Link to="/" className="interact-brand"><span>INTER</span>ACT</Link>
            <nav className="nav flex-column gap-2" aria-label="Menú principal">
                <NavLink to={`/usuarios/${authState.user?.uid}/tweets`} className="nav-link">♙ <span>Mi Perfil</span></NavLink>
                <NavLink to="/feed" className="nav-link">☷ <span>Feed</span></NavLink>
                <NavLink to="/follow" className="nav-link">♧ <span>Follow</span></NavLink>
            </nav>
            <button type="button" className="btn interact-button rounded-pill w-100 mt-4" onClick={() => setShowPostModal(true)}>Postear</button>
            {showPostModal && <PostModal onClose={() => setShowPostModal(false)} />}
            <FollowRecommendations />
            <div className="sidebar-account">
                <p className="small text-break">{authState.user?.username || authState.user?.email}</p>
                <button className="btn post-secondary w-100" onClick={onLogout}>Salir</button>
            </div>
        </aside>
    );
};


