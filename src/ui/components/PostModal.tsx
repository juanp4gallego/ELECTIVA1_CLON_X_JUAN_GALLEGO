import { useEffect, useRef } from "react";
import { PostComposer } from "../../tweets/components/PostComposer";

interface PostModalProps {
    onClose: () => void;
}

export const PostModal = ({ onClose }: PostModalProps) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const element = dialog.current;
        element?.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            element?.close();
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <dialog ref={dialog} className="post-modal" aria-labelledby="post-modal-title"
            onCancel={event => { event.preventDefault(); onClose(); }}
            onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
            <div className="modal-content" onClick={event => event.stopPropagation()}>
                <div className="modal-header d-flex justify-content-between align-items-center p-3">
                    <h2 id="post-modal-title" className="h5 mb-0">Postear</h2>
                    <button type="button" className="btn post-secondary" aria-label="Cerrar publicación" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body p-3"><PostComposer /></div>
            </div>
        </dialog>
    );
};
