
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import "./AuthLayout.css";

interface AuthLayoutProps {
    children: ReactNode;
    active: "login" | "register";
}

export const AuthLayout = ({ children, active }: AuthLayoutProps) => (
    <main className="container-fluid auth-screen">
        <div className="auth-columns min-vh-100">
            <section className="d-flex align-items-center justify-content-center p-4 auth-brand" aria-label="INTERACT">
                <svg className="auth-network auth-network-bottom" viewBox="0 0 400 440" fill="none" aria-hidden="true">
                    <g stroke="#8a2be2" strokeWidth="1">
                        <path d="M0 80 75 205 15 400 205 375 265 260 75 205 190 170 265 260 15 400 0 280 205 375 75 205 0 220M0 80 190 170 205 375M15 400 110 440M265 260 330 440M0 280 190 170" />
                    </g>
                    <g fill="#8a2be2">
                        <circle cx="0" cy="80" r="5" /><circle cx="75" cy="205" r="6" /><circle cx="15" cy="400" r="5" />
                        <circle cx="205" cy="375" r="4" /><circle cx="265" cy="260" r="6" /><circle cx="190" cy="170" r="4" />
                    </g>
                </svg>
                <svg className="auth-network auth-network-top" viewBox="0 0 300 300" fill="none" aria-hidden="true">
                    <g stroke="#8a2be2" strokeWidth="1">
                        <path d="M0 0 80 60 230 20 180 170 300 200 230 20 300 0M80 60 180 170 300 290M180 170 300 130M80 60 100 0" />
                    </g>
                    <g fill="#8a2be2"><circle cx="80" cy="60" r="4" /><circle cx="230" cy="20" r="4" /><circle cx="180" cy="170" r="5" /></g>
                </svg>
                <div className="text-center auth-brand-name">

                    <h1 className="auth-wordmark"><span>INTER</span>ACT</h1>
                </div>
            </section>
            <section className="d-flex align-items-center justify-content-center p-4 auth-panel">
                <div className="w-100 auth-content">
                    <nav className="nav nav-underline nav-fill mb-4" aria-label="Acceso a la cuenta">
                        <Link className={active === "login" ? "nav-link active" : "nav-link"} to="/login" aria-current={active === "login" ? "page" : undefined}>INICIAR SESIÓN</Link>
                        <Link className={active === "register" ? "nav-link active" : "nav-link"} to="/register" aria-current={active === "register" ? "page" : undefined}>REGISTRARSE</Link>
                    </nav>
                    {children}
                </div>
            </section>
        </div>
    </main>
);


