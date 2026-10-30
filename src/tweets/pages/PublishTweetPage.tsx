import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import type { AuthState } from "../../auth/types/AuthReducerInterfaces";
import { TweetContext } from "../contexts/TweetContext";

export const PublishTweetPage = () => {
    const { authState } = useContext(AuthContext) as { authState: AuthState };
    const context = useContext(TweetContext);
    const [message, setMessage] = useState("");
    const [publishing, setPublishing] = useState(false);
    if (!context) throw new Error("PublishTweetPage requiere TweetProvider");
    const { tweetState, publishTweet, clearMessage } = context;

    const onPublish = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (publishing) return;
        setPublishing(true);
        try {
            const result = await publishTweet(message, authState.user?.uid ?? "");
            if (result) setMessage("");
        } finally {
            setPublishing(false);
        }
    };

    return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="h3 mb-4">Publicar tweet</h1>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={onPublish}>
                                <label htmlFor="tweet-message" className="form-label">¿Qué está pasando?</label>
                                <textarea id="tweet-message" className="form-control" rows={5} value={message}
                                    onChange={(event) => { setMessage(event.target.value); clearMessage(); }}
                                    aria-describedby="tweet-count" />
                                <p id="tweet-count" className={message.length > 280 ? "text-danger mt-2" : "mt-2"}>
                                    {message.length}/280 caracteres
                                </p>
                                {tweetState.errorMessage && <div className="alert alert-danger" role="alert">{tweetState.errorMessage}</div>}
                                {tweetState.successMessage && <div className="alert alert-success" role="status">{tweetState.successMessage}</div>}
                                <button type="submit" className="btn theme-primary" disabled={publishing}>
                                    {publishing ? "Publicando..." : "Publicar"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
