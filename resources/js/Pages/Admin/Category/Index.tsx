import AdminLayout from '@/Layouts/AdminLayout';
import { Edit, Link, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface PaginatedCategories {
    data: Category[];
    links: any[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

const Index: React.FC<{ categories: PaginatedCategories }> = ({
    categories,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <AdminLayout title="Categories">
            <div className="flex h-full flex-col">
                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {/* 2. Enhanced Filter Section */}
                        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Search */}
                                    <div className="relative w-full md:w-72">
                                        <Search
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search by name, SKU..."
                                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                </div>

                                <Link
                                    href={route('admin.products.create')} // Ensure this route exists
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 hover:shadow-emerald-200"
                                >
                                    <Plus size={18} />
                                    Add New Product
                                </Link>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {/* Map over categories.data provided by Laravel Pagination */}
                                    {categories?.data?.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="group transition-colors hover:bg-slate-50/80"
                                        >
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {category.name}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 transition-opacity">
                                                    <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Empty State if no data */}
                                    {(!categories?.data ||
                                        categories.data.length === 0) && (
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="py-12 text-center text-slate-400"
                                            >
                                                No categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* 3. Pagination Footer
                        {categories?.links && (
                            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4">
                                <div className="text-sm text-slate-500">
                                    Showing{' '}
                                    <span className="font-medium text-slate-700">
                                        {categories.from}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium text-slate-700">
                                        {categories.to}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium text-slate-700">
                                        {categories.total}
                                    </span>{' '}
                                    results
                                </div>
                                <div className="flex gap-1">
                                    {categories.links.map((link, k) => (
                                        <Link
                                            key={k}
                                            href={link.url}
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
                        )} */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
