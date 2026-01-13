import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { Edit, Filter, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Sku {
    id: number;
    sku: string;
    price: number;
    stock: number;
    is_main: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    category?: Category;
    skus?: Sku[];
    price_range: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedProducts {
    data: Product[];
    links: any[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

const Index: React.FC<{ products: PaginatedProducts }> = ({ products }) => {
    // <--- Receive products prop from Laravel
    const [showFilters, setShowFilters] = useState(false);

    return (
        <AdminLayout title="Products">
            {/* Main Container - Removed restrictive padding to feel "Full Size" */}
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

                                    {/* Filter Toggle */}
                                    <button
                                        onClick={() =>
                                            setShowFilters(!showFilters)
                                        }
                                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                                            showFilters
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <Filter size={16} />
                                        Filters
                                    </button>
                                </div>

                                <Link
                                    // href={route('admin.products.create')} // Ensure this route exists
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 hover:shadow-emerald-200"
                                >
                                    <Plus size={18} />
                                    Add New Product
                                </Link>
                            </div>

                            {/* Expandable Filter Options */}
                            {showFilters && (
                                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 md:grid-cols-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-500">
                                            Category
                                        </label>
                                        <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none">
                                            <option value="">
                                                All Categories
                                            </option>
                                            <option value="electronics">
                                                Electronics
                                            </option>
                                            <option value="clothing">
                                                Clothing
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-500">
                                            Status
                                        </label>
                                        <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none">
                                            <option value="">All Status</option>
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-500">
                                            Price Range
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-end">
                                        <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">
                                            Product
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Stock
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {/* Map over products.data provided by Laravel Pagination */}
                                    {products?.data?.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="group transition-colors hover:bg-slate-50/80"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                                                        <img
                                                            src="https://placehold.co/100"
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-700">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-xs text-slate-400">
                                                            SKU:{' '}
                                                            {product.skus?.[0]
                                                                ?.sku || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {product.category?.name ||
                                                    'N/A'}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-700">
                                                {product.price_range}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {product.skus?.reduce(
                                                    (sum, sku) =>
                                                        sum + sku.stock,
                                                    0,
                                                ) || 0}{' '}
                                                units
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                                        product.is_active
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : 'bg-slate-100 text-slate-500'
                                                    }`}
                                                >
                                                    {product.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
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
                                    {(!products?.data ||
                                        products.data.length === 0) && (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="py-12 text-center text-slate-400"
                                            >
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* 3. Pagination Footer
                        {products?.links && (
                            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4">
                                <div className="text-sm text-slate-500">
                                    Showing{' '}
                                    <span className="font-medium text-slate-700">
                                        {products.from}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium text-slate-700">
                                        {products.to}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium text-slate-700">
                                        {products.total}
                                    </span>{' '}
                                    results
                                </div>
                                <div className="flex gap-1">
                                    {products.links.map((link, k) => (
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
