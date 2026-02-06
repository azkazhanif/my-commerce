import React from 'react';

interface ButtonIconProps {
    icon: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
    icon,
    type = 'button',
    onClick,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
        >
            {icon}
        </button>
    );
};

export default ButtonIcon;
