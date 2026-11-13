import { AuthIcon } from "./AuthIcon";
import { AuthLayout } from "./AuthLayout";
import { Alert } from "../../ui/components/Alert";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import type { RegisterForm } from "../types/RegisterInterfaces";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, registrationError } = useContext(AuthContext);
    const [form, setForm] = useState<RegisterForm>({ fullName: "", username: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attempt, setAttempt] = useState(0);


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });

    };
    const onRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return;
        setAttempt(current => current + 1);
        setLoading(true);

        try {
            if (await register(form)) {
                navigate("/login", { replace: true, state: { registered: true } });
                setForm({ fullName: "", username: "", email: "", password: "" });
            }
        } finally { setLoading(false); }
    };

    return (
        <AuthLayout active="register">
            {!loading && attempt > 0 && registrationError && (
                <Alert key={attempt} type="danger" message={registrationError} />
            )}
            <div>
                <div>
                    <div>
                        <div>
                            <h1 className="h4 mb-4">Crear cuenta</h1>
                            <form onSubmit={onRegister} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="register-name" className="visually-hidden">Nombre completo</label>
                                    <div className="input-group auth-field"><span className="input-group-text"><AuthIcon name="user" /></span>
                                    <input placeholder="Nombre completo" id="register-name" name="fullName" className="form-control" value={form.fullName} onChange={onInputChange} autoComplete="name" required /></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-username" className="visually-hidden">Nombre de usuario</label>
                                    <div className="input-group auth-field"><span className="input-group-text"><AuthIcon name="user" /></span>
                                    <input placeholder="Nombre de usuario" id="register-username" name="username" className="form-control" value={form.username} onChange={onInputChange} autoComplete="username" pattern="[a-zA-Z0-9_]{3,20}" aria-describedby="username-help" required /></div>
                                    <p id="username-help" className="auth-help mt-2">De 3 a 20 letras, números o guion bajo.</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-email" className="visually-hidden">Correo electrónico</label>
                                    <div className="input-group auth-field"><span className="input-group-text"><AuthIcon name="mail" /></span>
                                    <input placeholder="Correo electrónico" id="register-email" type="email" name="email" className="form-control" value={form.email} onChange={onInputChange} autoComplete="email" required /></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-password" className="visually-hidden">Contraseña</label>
                                    <div className="input-group auth-field"><span className="input-group-text"><AuthIcon name="lock" /></span>
                                    <input placeholder="Contraseña" id="register-password" type={showPassword ? "text" : "password"} name="password" className="form-control" value={form.password} onChange={onInputChange} autoComplete="new-password" minLength={6} aria-describedby="password-help" required />
                                    <button type="button" className="btn auth-show" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}><AuthIcon name="eye" /></button></div>
                                    <p id="password-help" className="auth-help mt-2">La contraseña debe tener mínimo 6 caracteres.</p>
                                </div>
                                <button type="submit" className="btn auth-submit w-100" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};





