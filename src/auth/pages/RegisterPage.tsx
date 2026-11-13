import { Alert } from "../../ui/components/Alert";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import type { RegisterForm } from "../types/RegisterInterfaces";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, registrationError } = useContext(AuthContext);
    const [form, setForm] = useState<RegisterForm>({ fullName: "", username: "", email: "", password: "" });
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
        <main className="container py-5">
            {!loading && attempt > 0 && registrationError && (
                <Alert key={attempt} type="danger" message={registrationError} />
            )}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="h4 mb-4">Crear cuenta</h1>
                            <form onSubmit={onRegister} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="register-name" className="form-label">Nombre completo</label>
                                    <input id="register-name" name="fullName" className="form-control" value={form.fullName} onChange={onInputChange} autoComplete="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-username" className="form-label">Nombre de usuario</label>
                                    <input id="register-username" name="username" className="form-control" value={form.username} onChange={onInputChange} autoComplete="username" pattern="[a-zA-Z0-9_]{3,20}" required />
                                    <p className="small mt-1">De 3 a 20 letras, números o guion bajo.</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-email" className="form-label">Correo electrónico</label>
                                    <input id="register-email" type="email" name="email" className="form-control" value={form.email} onChange={onInputChange} autoComplete="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-password" className="form-label">Contraseña</label>
                                    <input id="register-password" type="password" name="password" className="form-control" value={form.password} onChange={onInputChange} autoComplete="new-password" minLength={6} aria-describedby="password-help" required />
                                    <p id="password-help" className="small mt-1">La contraseña debe tener mínimo 6 caracteres.</p>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
                            </form>
                            <p className="mt-3 mb-0"><Link to="/login">Volver al login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};



