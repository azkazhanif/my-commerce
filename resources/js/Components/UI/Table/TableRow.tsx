import React from 'react';

const TableRow = ({ children }: { children: React.ReactNode }) => {
    return (
        <tr className="group transition-colors hover:bg-slate-50/80">
            {children}
        </tr>
    );
};

export default TableRow;
