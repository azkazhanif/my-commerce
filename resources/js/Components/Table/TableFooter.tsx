import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

interface TableFooterProps {
    meta: PaginationMeta;
}

const TableFooter: React.FC<TableFooterProps> = ({ meta }) => {
    return (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4">
            <div className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-medium text-slate-700">{meta.from}</span>{' '}
                to <span className="font-medium text-slate-700">{meta.to}</span>{' '}
                of{' '}
                <span className="font-medium text-slate-700">{meta.total}</span>{' '}
                results
            </div>
            <div className="flex gap-1">
                {meta.links.map((link, k) => (
                    <Link
                        key={k}
                        href={link.url || '#'}
                        disabled={!link.url}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                        className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100'
                                : !link.url
                                  ? 'cursor-not-allowed text-slate-300'
                                  : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TableFooter;
