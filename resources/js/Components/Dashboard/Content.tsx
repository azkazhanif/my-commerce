import React from 'react';

interface ContentProps {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                {children}
            </div>
        </div>
    );
};

export default Content;
