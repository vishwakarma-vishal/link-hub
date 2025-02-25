import React, { useEffect, useState } from "react";

type EmbedProps = {
    url: string;
    category: string;
};

const Embed: React.FC<EmbedProps> = ({ url, category }) => {
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [iframeError, setIframeError] = useState(false);

    useEffect(() => {
        let embedUrl: string | null = null;

        if (category === "youtube") {
            const videoId = new URL(url).searchParams.get("v") || url.split("/").pop();
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (category === "twitter") {
            embedUrl = url.replace("x.com", "twitter.com");
        } else if (category === "linkedin") {
            const match = url.match(/activity-(\d+)/);
            if (match) {
                const postId = match[1];
                embedUrl = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`;
            } else {
                console.error("Invalid LinkedIn URL format.");
            }
        } else if (category === "instagram") {
            embedUrl = url;
        } else {
            embedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
        }

        console.log(`Determined embed URL for category ${category}: ${embedUrl}`);
        setEmbedUrl(embedUrl);
    }, [url, category]);

    useEffect(() => {
        if (category === "twitter") {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }

        if (category === "instagram") {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = () => {
                (window as any).instgrm?.Embeds.process();
            };
            document.body.appendChild(script);
        }
    }, [category]);

    return (
        <div className="w-full rounded-lg overflow-hidden">
            {/* YouTube Embed */}
            {category === "youtube" && embedUrl && (
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
            {category === "twitter" && embedUrl && (
                <div className="overflow-scroll">
                    <blockquote className="twitter-tweet" data-dnt="true">
                        <a href={embedUrl}></a>
                    </blockquote>
                </div>
            )}

            {/* LinkedIn Embed */}
            {category === "linkedin" && embedUrl ? (
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
                category === "linkedin" && <p className="text-red-500">Invalid LinkedIn Post URL</p>
            )}

            {/* Instagram Embed */}
            {category === "instagram" && embedUrl && (
                <div className="h-full overflow-scroll" >
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={url}
                        data-instgrm-version="12"
                    ></blockquote>
                </div>
            )}

            {/* Unrecognized Embed */}
            {category === "link" && embedUrl && !iframeError && (
                <div>
                    {embedUrl.includes("google.com") ? (
                        <p className="text-red-400 text-sm">Google cannot be embedded. Please visit the link below:</p>
                    ) : (
                        <iframe
                            className="w-full h-64 rounded-lg"
                            src={embedUrl}
                            title="Unrecognized website"
                            frameBorder="0"
                            onError={() => setIframeError(true)}
                        ></iframe>
                    )}
                    <a href={embedUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        Visit link
                    </a>
                </div>
            )}


            {/* Fallback for Unrecognized Embed */}
            {iframeError && (
                <div>
                    <p className="text-red-500">This content cannot be embedded. Please visit the link below:</p>
                    <a href={url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        {url}
                    </a>
                </div>
            )}

            {/* Default: If no embed type is found, show the raw link */}
            {!category && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {url}
                </a>
            )}
        </div>
    );
};

export default Embed;
