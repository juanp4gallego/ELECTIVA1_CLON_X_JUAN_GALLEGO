import type { TweetAttachment } from "../types/TweetInterfaces";
export const PostAttachment = ({ attachment }: { attachment?: TweetAttachment }) => {
    if (!attachment) return null;
    if (attachment.type === "image") return <img src={attachment.url} alt={attachment.name} className="post-media mt-3" />;
    if (attachment.type === "video") return <video src={attachment.url} controls className="post-media mt-3" />;
    return <a href={attachment.url} download={attachment.name} className="post-file d-block mt-3">📎 {attachment.name}</a>;
};
