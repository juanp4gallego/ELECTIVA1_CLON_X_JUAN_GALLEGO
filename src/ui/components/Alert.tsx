import { useEffect, useState } from "react";

interface AlertProps {
    message: string;
    type: "success" | "danger";
    duration?: number;
}

export const Alert = ({ message, type, duration = 7000 }: AlertProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setVisible(false), duration);
        return () => window.clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="fixed-top p-3" style={{ zIndex: 1100 }}>
            <div className="container">
                <div className="alert d-flex justify-content-between align-items-start gap-3 shadow mb-0"
                    style={{ backgroundColor: type === "success" ? "#198754" : "#b02a37", color: "#ffffff", borderColor: "transparent" }}
                    role={type === "danger" ? "alert" : "status"}>
                    <span style={{ color: "inherit" }}>{message}</span>
                    <button type="button" className="btn-close btn-close-white" aria-label="Cerrar alerta" onClick={() => setVisible(false)} />
                </div>
            </div>
        </div>
    );
};

