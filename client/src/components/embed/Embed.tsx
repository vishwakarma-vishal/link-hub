import React, { useEffect, useState } from "react";

type EmbedProps = {
    url: string;
    setLinkType: Function
};

const Embed: React.FC<EmbedProps> = ({ url, setLinkType }) => {
    const [embedUrl, setEmbedUrl] = useState("");
    const [embedType, setEmbedType] = useState("");

    useEffect(() => {
        let embedUrl = "";
        let embedType = "";

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = new URL(url).searchParams.get("v") || url.split("/").pop();
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
            embedType = "youtube";
        }
        else if (url.includes("x.com")) {
            embedType = "twitter";
        }
        else if (url.includes("linkedin.com")) {
            embedType = "linkedin";
            console.log(url);

            // Extract LinkedIn Post ID Correctly
            const match = url.match(/activity-(\d+)/);

            if (match) {
                const postId = match[1];
                console.log(postId);
                embedUrl = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`;
                console.log(embedUrl);
            } else {
                console.error("Invalid LinkedIn URL format.");
            }
        }
        else if (url.includes("instagram.com")) {
            embedType = "instagram";
        } else {
            embedType = "link";
            embedUrl = url;
        }

        setEmbedUrl(embedUrl);
        setEmbedType(embedType);
        setLinkType(embedType);
    }, [url]);

    useEffect(() => {
        if (embedType === "twitter") {
            // ...existing code...
        }

        if (embedType === "instagram") {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = () => {
                console.log("Instagram script loaded");
                (window as any).instgrm?.Embeds.process();
            };
            document.body.appendChild(script);
        }
    }, [embedType]);

    return (
        <div className="w-full rounded-lg overflow-hidden">
            {/* YouTube Embed */}
            {embedType === "youtube" && (
                <iframe
                    className="w-full rounded-lg"
                    src={embedUrl}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            )}

            {/* Twitter Embed */}
            {embedType === "twitter" && (
                <div className="overflow-scroll">
                    <blockquote className="twitter-tweet" data-dnt="true">
                        <a href={url.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                </div>
            )}

            {/* LinkedIn Embed */}
            {embedType === "linkedin" && embedUrl ? (
                <div className="h-full overflow-scroll">
                    <iframe
                        src={embedUrl}
                        height="600"
                        frameBorder="0"
                        allowFullScreen
                        title="LinkedIn Post"
                    ></iframe>
                </div>
            ) : (
                embedType === "linkedin" && <p className="text-red-500">Invalid LinkedIn Post URL</p>
            )}

            {/* Instagram Embed */}
            {embedType === "instagram" && (
                <div className="h-full overflow-scroll" >
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={url}
                        data-instgrm-version="12"
                    ></blockquote>
                </div>
            )}

            {/* Unrecognized Embed */}
            {embedType === "link" && (
                <div>
                    <iframe
                        className="w-full h-64 rounded-lg"
                        src={embedUrl}
                        title="Unrecognized website"
                        frameBorder="0"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'block';
                        }}
                    ></iframe>
                    <a href={embedUrl} className="text-blue-500 underline">Visit link</a>
                </div >
            )}

            {/* Default: If no embed type is found, show the raw link */}
            {!embedType && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {url}
                </a>
            )}

            {/* Fallback link for unrecognized embed */}
            {embedType === "link" && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" style={{ display: 'none' }}>
                    {url}
                </a>
            )}
        </div>
    );
};

export default Embed;
