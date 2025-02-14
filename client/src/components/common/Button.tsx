import React, { ReactElement } from "react";

const varient = {
    "primary": "bg-blue-600 text-white",
    "secondary": "bg-blue-200 text-black"
} as const;

type ButtonProps = {
    type: keyof typeof varient;
    icon: ReactElement;
    text: string;
    handler: Function
}

const Button: React.FC<ButtonProps> = ({ handler, type, icon, text }) => {
    return (
        <button onClick={handler} className={`flex items-center gap-2 py-2 px-4 rounded-lg ${varient[type]}`}>
            <span>{icon}</span>
            <span>{text}</span>
        </button>
    );
}

export default Button;