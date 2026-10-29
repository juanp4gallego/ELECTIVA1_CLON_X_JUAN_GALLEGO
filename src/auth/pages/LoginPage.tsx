import { useContext, useState, type ChangeEvent } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const initialForm = {
    email: '',
    password: ''
}

export const LoginPage = () => {
    const { authState, login } = useContext(AuthContext);
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();
    const { email, password } = form;

    const onSignIn = async () => {
        const result = await login(email, password);
        console.log(authState)
        if (result) {
            navigate('/', { replace: true })
        }
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target
        setForm({
            ...form,
            [input.name]: input.value
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row min-vh-100">
                    <div className="col-md-6" aria-hidden="true"></div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
                <form className="w-100" style={{ maxWidth: "350px" }}>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" name="email" onChange={onInputChange} />
                        <label className="form-label">Email address</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" name="password" onChange={onInputChange} />
                        <label className="form-label">Password</label>
                    </div>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4"
                        onClick={onSignIn}>Sign in</button>

                    {authState.errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {authState.errorMessage}
                        </div>
                    )}

                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                        <p>or sign up with:</p>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </>
    )
}
