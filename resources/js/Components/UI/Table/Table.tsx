import { ReactNode } from 'react';

const Table = ({ children }: { children: ReactNode }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">{children}</table>
        </div>
    );
};

export default Table;
