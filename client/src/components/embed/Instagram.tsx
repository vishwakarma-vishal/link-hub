import { useEffect } from "react";

interface InstagramEmbedProps {
  url: string;
}

const Instagram: React.FC<InstagramEmbedProps> = ({ url }) => {
  useEffect(() => {
    // Load Instagram embed script only once
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [url]);

  return (
    <div>
      <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14"></blockquote>
    </div>
  );
};

export default Instagram;
