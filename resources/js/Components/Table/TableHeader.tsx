interface HeaderItem {
    title: string;
    textAlign?: string;
}

interface TableHeaderProps {
    headers: HeaderItem[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
    return (
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
                {headers.map((h, index) => (
                    <th
                        key={index}
                        className={`px-6 py-4 ${h.textAlign || 'text-left'} font-semibold`}
                    >
                        {h.title}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
