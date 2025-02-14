import React from "react";

type YouTubeProps = {
    url: string;
};

const YouTube: React.FC<YouTubeProps> = ({ url }) => {
    // Extract Video ID
    const videoId = new URL(url).searchParams.get("v") || url.split("/").pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    console.log(embedUrl); // Debugging output

    return (
        <iframe
            className="w-full rounded-lg"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    );
};

export default YouTube;
