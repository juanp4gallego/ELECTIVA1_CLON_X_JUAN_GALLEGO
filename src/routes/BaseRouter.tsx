import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "../auth/contexts/AuthContext";
import { ClonApp } from "../ClonApp";

export const BaseRouter = () => {
    const { authState, checkingSession } = useContext(AuthContext);
    if (checkingSession) return <p className="container py-4" role="status">Cargando sesión...</p>;
    return (
        <Routes>
            <Route path="/login" element={authState.logged ? <Navigate to="/" replace /> : <LoginPage />} />
            <Route path="/*" element={authState.logged ? <ClonApp /> : <Navigate to="/login" replace />} />
        </Routes>
    );
};

