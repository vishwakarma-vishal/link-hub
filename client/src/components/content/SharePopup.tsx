import React from "react";
import { FaWhatsapp, FaTwitter, FaFacebook, FaEnvelope, FaCopy } from "react-icons/fa";

interface SharePopupProps {
    isOpen: boolean;
    onClose: () => void;
    shareLink: string;
}

const SharePopup: React.FC<SharePopupProps> = ({ isOpen, onClose, shareLink }) => {
    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="absolute flex justify-center items-center top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">Share Your Hub with others</h2>

                <div className="flex justify-center gap-4 my-3">
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="text-green-500 text-3xl cursor-pointer" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-blue-500 text-3xl cursor-pointer" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-blue-700 text-3xl cursor-pointer" />
                    </a>
                    <a href={`mailto:?subject=Check this out!&body=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                        <FaEnvelope className="text-gray-600 text-3xl cursor-pointer" />
                    </a>
                    <FaCopy className="text-gray-800 text-3xl cursor-pointer" onClick={copyToClipboard} />
                </div>

                <div className="flex items-center border rounded-lg p-2">
                    <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="flex-grow p-2 border-none outline-none"
                    />
                    <FaCopy className="text-gray-800 text-2xl cursor-pointer ml-2" onClick={copyToClipboard} />
                </div>

                <button className="mt-4 bg-red-500 text-white px-4 py-1 rounded-full" onClick={onClose}>
                    Close
                </button>
            </div> 
        </div>
    );
};

export default SharePopup;
