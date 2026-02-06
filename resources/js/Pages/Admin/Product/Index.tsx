import Content from '@/Components/Dashboard/Content';
import ButtonIcon from '@/Components/UI/Button/ButtonIcon';
import NoRows from '@/Components/UI/Table/NoRows';
import RowBody from '@/Components/UI/Table/RowBody';
import Table from '@/Components/UI/Table/Table';
import TableBody from '@/Components/UI/Table/TableBody';
import TableFooter from '@/Components/UI/Table/TableFooter';
import TableHeader from '@/Components/UI/Table/TableHeader';
import TableRow from '@/Components/UI/Table/TableRow';
import TableToolbar from '@/Components/UI/Table/TableToolbar';
import AdminLayout from '@/Layouts/AdminLayout';
import { Edit, Trash2 } from 'lucide-react';

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
    links: PaginationLink[];
    meta: {
        from: number;
        to: number;
        total: number;
        links: PaginationLink[];
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

const Index: React.FC<{ products: PaginatedProducts }> = ({ products }) => {
    const headers = [
        {
            title: 'Product',
        },
        {
            title: 'Category',
        },
        {
            title: 'Price',
        },
        {
            title: 'Stock',
        },
        {
            title: 'Status',
        },
        {
            title: 'Actions',
        },
    ];

    return (
        <AdminLayout title="Products">
            <Content>
                <TableToolbar
                    searchPlaceholder="Search by name, SKU..."
                    createLink={route('admin.products.create')}
                    createLabel="Add New Product"
                >
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Category
                        </label>
                        <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none">
                            <option value="">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Status
                        </label>
                        <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
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
                </TableToolbar>

                <Table>
                    <TableHeader headers={headers} />
                    <TableBody>
                        {products?.data?.map((product) => (
                            <TableRow key={product.id}>
                                <RowBody>
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
                                                {product.skus?.[0]?.sku ||
                                                    'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </RowBody>
                                <RowBody>
                                    {product.category?.name || 'N/A'}
                                </RowBody>
                                <RowBody>
                                    <span className="font-bold text-slate-700">
                                        {product.price_range}
                                    </span>
                                </RowBody>
                                <RowBody>
                                    {product.skus?.reduce(
                                        (sum, sku) => sum + sku.stock,
                                        0,
                                    ) || 0}{' '}
                                    units
                                </RowBody>
                                <RowBody>
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
                                </RowBody>
                                <RowBody isFlex>
                                    <ButtonIcon icon={<Edit size={18} />} />
                                    <ButtonIcon icon={<Trash2 size={18} />} />
                                </RowBody>
                            </TableRow>
                        ))}
                        {(!products?.data || products.data.length === 0) && (
                            <NoRows title="No products found." colSpan={6} />
                        )}
                    </TableBody>
                </Table>
                {products?.links && <TableFooter meta={products.meta} />}
            </Content>
        </AdminLayout>
    );
};

export default Index;
