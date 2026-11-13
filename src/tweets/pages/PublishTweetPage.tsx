import { BackButton } from "../../ui/components/BackButton";
import { PostComposer } from "../components/PostComposer";
export const PublishTweetPage = () => (
    <main className="p-3"><header className="d-flex align-items-center gap-3 mb-3"><BackButton /><h1 className="h5 mb-0">Postear</h1></header><PostComposer /></main>
);

