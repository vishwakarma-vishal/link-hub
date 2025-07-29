

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-900 text-white text-center py-6 mt-auto">
            <p>© {new Date().getFullYear()} LinkHub. All rights reserved.</p>
        </footer>
    );
}

export default Footer;