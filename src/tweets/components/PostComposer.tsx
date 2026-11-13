import { useContext, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { TweetContext } from "../contexts/TweetContext";
import type { TweetAttachment } from "../types/TweetInterfaces";
import { PostAttachment } from "./PostAttachment";

export const PostComposer = () => {
    const { authState } = useContext(AuthContext);
    const { tweetState, publishTweet, clearMessage } = useContext(TweetContext);
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState<TweetAttachment>();
    const [busy, setBusy] = useState(false);
    const [fileError, setFileError] = useState("");
    const input = useRef<HTMLInputElement>(null);
    const [reading, setReading] = useState(false);

    const onFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        event.target.value = "";
        if (file.size > 10 * 1024 * 1024) { setFileError("El adjunto no debe superar 10 MB."); return; }
        setFileError("");
        clearMessage();
        setReading(true);
        const reader = new FileReader();
        reader.onload = () => {
            setAttachment({ name: file.name, url: String(reader.result), type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file" });
            setReading(false);
        };
        reader.onerror = () => { setFileError("No se pudo leer el archivo."); setReading(false); };
        reader.readAsDataURL(file);
    };

    const onPublish = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (busy || reading) return;
        setBusy(true);
        try {
            if (await publishTweet(message, authState.user?.uid ?? "", attachment)) {
                setMessage(""); setAttachment(undefined);
            }
        } finally { setBusy(false); }
    };

    return (
        <form className="card post-composer mb-3" onSubmit={onPublish}>
            <div className="card-body">
                <label htmlFor="post-message" className="visually-hidden">Texto de la publicación</label>
                <textarea id="post-message" className="form-control" placeholder="¿Qué está pasando?" rows={2} value={message}
                    onChange={event => { setMessage(event.target.value); clearMessage(); }} required maxLength={280} />
                <PostAttachment attachment={attachment} />
                {attachment && <button type="button" className="btn btn-sm post-secondary mt-2" onClick={() => setAttachment(undefined)}>Quitar adjunto</button>}
                <input ref={input} type="file" className="d-none" onChange={onFile} aria-label="Adjuntar un archivo" />
                <div className="d-flex align-items-center justify-content-between gap-2 mt-3">
                    <button type="button" className="btn btn-sm post-secondary" disabled={reading || busy} onClick={() => input.current?.click()}>📎 Adjuntar</button>
                    <span className="small">{message.length}/280</span>
                    <button className="btn interact-button rounded-pill" disabled={busy || reading}>{busy ? "Posteando..." : "Postear"}</button>
                </div>
                <p className="small mt-2 mb-0 post-muted">Solo una imagen, un video o un archivo. Máximo 10 MB.</p>
                {(fileError || tweetState.errorMessage) && <p className="text-danger mt-2" role="alert">{fileError || tweetState.errorMessage}</p>}
                {tweetState.successMessage && <p className="text-success mt-2" role="status">{tweetState.successMessage}</p>}
            </div>
        </form>
    );
};
