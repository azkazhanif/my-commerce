import React from 'react';

const RowBody = ({
    children,
    isFlex = false,
}: {
    children: React.ReactNode;
    isFlex?: boolean;
}) => {
    if (isFlex) {
        return (
            <td className="px-6 py-4 text-sm text-slate-600">
                <div className="flex gap-2 transition-opacity">{children}</div>
            </td>
        );
    }
    return <td className="px-6 py-4 text-sm text-slate-600">{children}</td>;
};

export default RowBody;
