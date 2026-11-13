import { AuthIcon } from "./AuthIcon";
import { Alert } from "../../ui/components/Alert";
import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";

export const LoginPage = () => {
    const { authState, login, loginWithGoogle } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [attempt, setAttempt] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const onSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return;
        setFormError("");
        setLoading(true);
        setAttempt(current => current + 1);
        try {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
                setFormError("Escribe un correo completo, por ejemplo nombre@correo.com.");
                return;
            }
            if (!form.password) {
                setFormError("Escribe tu contraseña para continuar.");
                return;
            }
            if (await login(form.email.trim(), form.password)) navigate("/", { replace: true });
        } finally { setLoading(false); }
    };

    const onGoogleSignIn = async () => {
        if (loading) return;
        setFormError("");
        setLoading(true);
        setAttempt(current => current + 1);
        try {
            if (await loginWithGoogle()) navigate("/", { replace: true });
        } finally { setLoading(false); }
    };

    return (
        <AuthLayout active="login">
            {location.state?.registered && attempt === 0 && <Alert type="success" message="Cuenta creada correctamente. Ya puedes iniciar sesión." />}
            {!loading && attempt > 0 && (formError || authState.errorMessage) && <Alert key={attempt} type="danger" message={formError || authState.errorMessage || ""} />}
            <button onClick={onGoogleSignIn} type="button" className="btn auth-google w-100 mb-3" disabled={loading}>
                <AuthIcon name="google" /> Continuar con Google
            </button>
            <div className="d-flex align-items-center gap-3 mb-3" aria-hidden="true">
                <hr className="flex-grow-1" /><span>O</span><hr className="flex-grow-1" />
            </div>
            <form onSubmit={onSignIn} noValidate>
                <div className="mb-3">
                    <label htmlFor="login-email" className="visually-hidden">Correo electrónico</label>
                    <div className="input-group auth-field">
                        <span className="input-group-text"><AuthIcon name="mail" /></span>
                    <input id="login-email" type="email" className="form-control" name="email" placeholder="nombre@correo.com"
                        inputMode="email" autoCapitalize="none" spellCheck={false} autoComplete="username" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} required />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="login-password" className="visually-hidden">Contraseña</label>
                    <div className="input-group auth-field">
                        <span className="input-group-text"><AuthIcon name="lock" /></span>
                        <input id="login-password" type={showPassword ? "text" : "password"} className="form-control"
                            autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })}
                            placeholder="Contraseña" required />
                        <button className="btn auth-show" type="button" onClick={() => setShowPassword(!showPassword)} aria-pressed={showPassword} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                            <AuthIcon name="eye" />
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn auth-submit w-100" disabled={loading}>{loading ? "Ingresando..." : "CONTINUAR"}</button>
            </form>
        </AuthLayout>
    );
};




