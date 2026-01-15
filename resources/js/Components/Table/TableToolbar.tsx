import { Link } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

interface TableToolbarProps {
    searchPlaceholder?: string;
    createLink?: string | null;
    createLabel?: string;
    children?: React.ReactNode | null;
    showFilter?: boolean;
}

export default function TableToolbar({
    searchPlaceholder = 'Search...',
    createLink = null,
    createLabel = 'Add New',
    children,
    showFilter = true,
}: TableToolbarProps) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    {showFilter && (
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                                showFilters
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {showFilters ? (
                                <X size={16} />
                            ) : (
                                <Filter size={16} />
                            )}
                            Filters
                        </button>
                    )}
                </div>

                {/* Add New Button (Optional - only shows if createLink is passed) */}
                {createLink && (
                    <Link
                        href={createLink}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 hover:shadow-emerald-200"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">{createLabel}</span>
                    </Link>
                )}
            </div>

            {/* Dynamic Filter Area - Renders whatever you pass as children */}
            {showFilters && (
                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 md:grid-cols-4">
                    {children}

                    {/* Standard Apply Button (Can be overridden if needed) */}
                    <div className="flex items-end">
                        <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
