import { useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        // React Router guarda la posición de la página en el historial.
        const index = window.history.state?.idx;
        if (typeof index === "number" && index > 0) {
            navigate(-1);
        } else {
            navigate("/feed", { replace: true });
        }
    };

    return (
        <button type="button" className="btn back-button" onClick={goBack} aria-label="Volver a la página anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m12 5-7 7 7 7M5 12h15" />
            </svg>
            <span className="visually-hidden">Volver</span>
        </button>
    );
};
