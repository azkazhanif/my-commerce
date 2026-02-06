import { ReactNode } from 'react';

const TableBody = ({ children }: { children: ReactNode }) => {
    return <tbody className="divide-y divide-slate-100">{children}</tbody>;
};

export default TableBody;
